class AIProcessor {
    constructor(client, docGenProcessor,accessToken, parallelLimit = 4) {
        this.client = client;
        this.accessToken=accessToken
        this.docGenProcessor = docGenProcessor; // Reference to the DocGenProcessor
        this.parallelLimit = parallelLimit;
        this.jobQueue = [];
        this.activeWorkers = 0;
        this.totalJobs = 0;
        this.completedJobs = 0;
        this.dialogueHistory = [];
    }

    async processNextJob() {
        if (this.jobQueue.length === 0 || this.activeWorkers >= this.parallelLimit) {
            return;
        }

        this.activeWorkers++;
        const job = this.jobQueue.shift();

        try {
            const aiResult = await this.createAiTextGen(job,this.accessToken);

            this.completedJobs++;

            // Convert AI result into a DocGen job
            const docGenJob = this.transformAiResultToDocGen(job, aiResult);
            this.docGenProcessor.addJob(docGenJob); // Add to DocGen processor

        } catch (error) {
            console.error("AI Job failed:", error);
        }

        this.activeWorkers--;
        this.processNextJob();
    }

    transformAiResultToDocGen(aiJob, aiResult) {
        return {
            uniqueId:aiJob.fileId,
            uploadedFileId: aiJob.boxFileId,  // The same file
            folderId: aiJob.folderId,  // Destination folder
            fileName: JSON.parse(aiResult.answer).fileName || `Generated_${aiJob.fileId}`,
            userInput:JSON.parse(aiResult.answer)

        };
    }

    addJob(job) {
        console.log(job.content);
        this.jobQueue.push(job);
        this.totalJobs++;
        this.processNextJob();
    }

    async generateJobs(generateFunction) {
        for await (const job of generateFunction()) {
            this.addJob(job);
        }
    }

    getStatus() {
        return {
            totalJobs: this.totalJobs,
            completedJobs: this.completedJobs,
            inProgress: this.activeWorkers,
            pendingJobs: this.jobQueue.length,
        };
    }
    async createAiTextGen(job, accessToken) {
        const _this = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "https://api.box.com/2.0/ai/ask",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    mode: "single_item_qa",
                    prompt: job.prompt,
                    items: [
                        {
                            id: job.boxFileId,
                            type: "file",
                            content: JSON.stringify(job.content),
                        },
                    ],
                    dialogueHistory:this.dialogueHistory
                }),
                success: function(response) {
                    _this.dialogueHistory.push({prompt:job.prompt,answer:response.answer,createdAt:response.created_at});
                    resolve(response); // Resolve the Promise with API response
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(new Error(`AI API Error: ${textStatus}, ${errorThrown}, ${jqXHR.responseText}`));
                },
            });
        });
    }
    
}

class DocGenProcessor {
    constructor(client, parallelLimit = 4) {
        this.client = client;
        this.parallelLimit = parallelLimit;
        this.jobQueue = [];
        this.activeWorkers = 0;
        this.totalJobs = 0;
        this.completedJobs = 0;
        this.jobResults = new Map(); // Store job results
    }

    async processNextJob() {
        if (this.jobQueue.length === 0 || this.activeWorkers >= this.parallelLimit) {
            return;
        }

        this.activeWorkers++;
        const job = this.jobQueue.shift();

        try {
            const result = await this.client.docgen.createDocgenBatchV2025R0({
                file: { id: job.uploadedFileId,type:'file' },
                inputSource: 'api',
                destinationFolder: {
                    id: job.folderId,
                    type:'folder'
                },
                outputType: 'pdf',
                documentGenerationData: [
                    {
                        generatedFileName: job.fileName,
                        userInput: job.userInput,
                    },
                ],
            });
            //console.log(result);
            this.completedJobs++;
            this.jobResults.set(job.uniqueId, {result:result,userInput:job.userInput}); // Store result

        } catch (error) {
            console.error("DocGen Job failed:", error);
        }

        this.activeWorkers--;
        this.processNextJob();
    }

    addJob(job) {
        this.jobQueue.push(job);
        this.totalJobs++;
        this.processNextJob();
    }

    async generateJobs(generateFunction) {
        for await (const job of generateFunction()) {
            this.addJob(job);
        }
    }

    getStatus() {
        return {
            totalJobs: this.totalJobs,
            completedJobs: this.completedJobs,
            inProgress: this.activeWorkers,
            pendingJobs: this.jobQueue.length,
        };
    }

    getJobResult(fileId) {
        return this.jobResults.get(fileId) || null; // Retrieve stored result
    }
    getJobResults() {
        return this.jobResults;
    }
}
function generateNameCriteria() {
    const gender = Math.random() < 0.5 ? "male" : "female";
    const x = Math.floor(Math.random() * 6) + 3; // Random number between 3 and 8
    const y = Math.floor(Math.random() * 7) + 4; // Random number between 4 and 10
  
    return `${gender} name with ${x} letters in first name and ${y} letters in last name like this: firstName lastName`;
  }
  function generateCriteria() {
    const y = Math.floor(Math.random() * 16) + 6; // Random number between 4 and 10
  
    return `value with ${y} letters`;
  }
  async function checkDocgenBatchJobs(docgenBatches,client) {
    let completedCount = 0;
    let completed_with_errors = 0;
    let inProgressCount = 0;
    const batchesArray = Array.from(docgenBatches.values());
    console.log(batchesArray);
    // Use filter to modify the original array while avoiding rechecking completed batches
    let i =0;
    const result = await Promise.all(
        //batchesArray.map(async (docgenBatch) => {
            Array.from(docgenBatches, async ([key, value]) => {

            console.log('batches:' + batchesArray.length + "::completedBatches:" + completedBatches.size);
            if (completedBatches.has(key) || completedWithErrorBatches.has(key)) {
                console.log('skipping: completed');
                return value.result;
            }
            //only check 10 to avoid rate limits
            if(i<=10) {
                try {
                    const jobDetails = await client.docgen.getDocgenBatchJobByIdV2025R0(value.result.id);
                    i++;
                    if (Array.isArray(jobDetails.entries)) {
                        let allCompleted = true;

                        for (const entry of jobDetails.entries) {
                            if (entry.status === "completed") {
                                completedCount++;
                                console.log(jobDetails);
                                console.log('adding to completed batches ' + entry.templateFile.id);
                                console.log(metadataMap);
                                let template = metadataMap.find(f => entry.templateFile.id === f.id);
                                console.log('apply ' + value.userInput + ' to ' + template.template.templateKey + ' for file ' + entry.outputFile.id);
                                await client.fileMetadata.createFileMetadataById(entry.outputFile.id, 'enterprise',template.template.templateKey,  mapFieldValues(template.fieldMappings,value.userInput,template.template.fields));
                                completedBatches.add(key); 

                            } else if (entry.status === "completed_with_error") {
                                completed_with_errors++;
                                console.log('adding to completed with errors batches');
                                completedWithErrorBatches.add(key); 

                            } else {
                                inProgressCount++;
                                allCompleted = false;
                            }
                        }
                    }
                    } catch (error) {
                        console.error(`Error fetching job ${value.id}:`, error);
                        completed_with_errors++;
                        console.log('adding to completed with errors batches');
                        completedWithErrorBatches.add(key); 
                        return docgenBatches[key]; // Keep batch if there's an error
                    }
            }
                
            return docgenBatches[key]; // Keep ongoing batches
        })
    );
    console.log(`Completed: ${completedCount}, Completed with errors: ${completed_with_errors} In Progress: ${inProgressCount}`);
    return { completedCount, completed_with_errors,inProgressCount, remainingBatches: docgenBatches };
}
// Example Usage

function generateFieldHints(jsonString) {
    const ignoreKeywords = ["date", "number", "id"]; // Ignore fields containing these words
    const hintCategories = [
        "modern",
        "old-fashioned",
        "European",
        "American",
        "business-style",
        "celebrity-inspired",
        "futuristic",
        "startup-friendly",
        "traditional",
        "artistic",
        "Tech",
        "Medical",
        "Transportation",
    ];

    function getRandomHint(fieldName) {
        
        if(fieldName.toLowerCase().includes('summary') ||  fieldName.toLowerCase().includes('description')) {
            return `Use a ${hintCategories[Math.floor(Math.random() * hintCategories.length)]} two or three paragraph text for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;

        }
        else {
            return `Use a ${hintCategories[Math.floor(Math.random() * hintCategories.length)]} value for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        }
        
    }

    function traverse(obj) {
        let newObj = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    newObj[key] = traverse(obj[key]); // Recursively process nested objects
                } else {
                    // Ignore fields with date, number, or id in their name
                        if (obj[key]==null || obj[key]==='null' || obj[key].startsWith('{{')) {
                            if(ignoreKeywords.some(kw => key.toLowerCase().includes(kw))) {
                                newObj[key] = 'use random ' + key;
                            }
                            else {
                                newObj[key] = getRandomHint(key);
                            }
                            
                        } else {
                            newObj[key] = obj[key]; // Keep original value for ignored fields
                        }
                }
            }
        }
        return newObj;
    }

    try {
        const parsedData = jsonString;
        return JSON.stringify(traverse(parsedData), null, 2); // Pretty-print JSON output
    } catch (error) {
        console.error("Invalid JSON:", error);
        return jsonString; // Return original JSON if parsing fails
    }
}

async function getTagsFromDoc(id) {
    const json = tagsMap.find(item => item.id === id);
    if(json) {
        return json.json;
    }
    else {
        let url = "https://api.box.com/2.0/ai/ask";

        await $.ajax({
            url:url,
            type: "post",
            headers: {
                "Authorization":"Bearer " + accessToken
            },
            data: JSON.stringify(
                {
                    "mode": "single_item_qa",
                    "prompt": "In this document are a number of tags on this format {{tag}}. Generate a json object based on avaiable tags. Only return the valid JSON, do not start the answer with three backticks and the word json",
                    "items": [
                        {
                            "id": id,
                            "type": "file"
                        }
                    ],
                    "dialogue_history": [],
                    "include_citations": true
                }

            ),
            success: function (response) {
                resp= response.answer;
                tagsMap.push({id:id,json:JSON.parse(response.answer)})
            }
        });
        return JSON.parse(resp);
    }
    
}
const flattenObject = (obj, prefix = '') => {
    let result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(result, flattenObject(obj[key], newKey)); // Recurse into object
            } else {
                result[newKey] = obj[key]; // Add the value to the result object
            }
        }
    }
    return result;
};

async function getDocGenTemplates() {
    let url = "https://api.box.com/2.0/docgen_templates";

    await $.ajax({
        url:url,
        type: "get",
        headers: {
            "Authorization":"Bearer " + accessToken
        },
        success: function (response) {
            resp= response.entries;
        }
    });
    return resp;
}

 // Find matching field based on path
 const findMatchingField = (path, fields) => {
    return fields.find(field => path.toLowerCase().endsWith(field.key.toLowerCase()));
};

function generateFieldsTable(fields) {
    // Retrieve fields based on templateKey (you would use the lookup mechanism)
    //const fields = getFieldsForTemplate(templateKey); // This is just an example function
  
    // Get the answer JSON from editor.get()
    const answer = editor.get();
    const flattenedAnswer = flattenJson(answer);

    // Clear previous rows in the table body
    $('#fieldTableBody').empty();
  
    fields.forEach(field => {
      // Prepare the field label (displayName + type)
      const fieldLabel = `${field.displayName} (${field.type})`;
  
      // Build dropdown options based on keys in the answer JSON
      const dropdown = buildDropdown(answer, field.key);
  
      // Check if the field's key exists in the answer JSON to pre-select the matching value
      
  
      // Add a new row to the table with the field label and dropdown
      $('#fieldTableBody').append(`
        <tr>
          <td>${fieldLabel}</td>
          <td>=></td>
          <td>
            <select class="form-control field-dropdown normalHeight" data-field-key="${field.key}">
              ${dropdown}
            </select>
          </td>
        </tr>
      `);
      const selectedValue = matchFieldWithAnswer(flattenedAnswer,field.key);
      // If a value was found in the answer, pre-select it
      if (selectedValue!=null) {
        $(`select[data-field-key="${field.key}"]`).val(selectedValue);
      }
    });
  }
  
  function buildDropdown(answer, fieldKey) {
    const flattenedAnswer = flattenJson(answer); // Flatten the answer JSON
    const matchedPath = matchFieldWithAnswer(flattenedAnswer, fieldKey); // Find matching path

    let options = [`<option value="" selected>----</option>`]; // Default blank option

    Object.keys(flattenedAnswer).forEach(path => {
        options.push(
            `<option value="${path}" ${path === matchedPath ? "selected" : ""}>${path}</option>`
        );
    });

    return options.join('');
}
  function matchFieldWithAnswer(flattenedAnswer, fieldKey) {
    fieldKey = fieldKey.toLowerCase(); // Normalize for case-insensitive comparison
    let matchedPaths = [];

    for (const answerPath in flattenedAnswer) {
        if (answerPath.toLowerCase().endsWith(`.${fieldKey}`) || answerPath.toLowerCase() === fieldKey) {
            matchedPaths.push(answerPath); // Store matching paths
        }
    }

    // Return the best match (or all matches if needed)
    return matchedPaths.length > 0 ? matchedPaths[0] : null; // Return the first (or improve selection logic)
}

  function flattenJson(json, prefix = '') {
    let result = {};
    for (let key in json) {
      if (json.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof json[key] === 'object' && json[key] !== null) {
          Object.assign(result, flattenJson(json[key], newKey)); // Recurse into nested objects
        } else {
          result[newKey] = json[key]; // Add the flat key-value pair
        }
      }
    }
    return result;
  }
  function mapFieldValues(fieldMapping, json, fields) {
    const result = {}; // To store the mapped values

    // Iterate over the field mappings
    for (let [fieldKey, jsonPath] of Object.entries(fieldMapping)) {
        // Use the jsonPath to access the value in the JSON
        const pathParts = jsonPath.split('.'); // Split the path (e.g., "aContract.agreementType" -> ["aContract", "agreementType"])
        let value = pathParts.reduce((obj, key) => obj && obj[key], json); // Traverse the JSON

        // Get the field type from the fields array
        const field = fields.find(f => f.key === fieldKey);
        if (field && value !== undefined) {
            // Validate the value based on the field type
            const isValid = validateFieldValue(field.type, value, field.options);

            if (isValid) {
                // If valid, add the transformed value (e.g., lowercase string) to the result
                result[fieldKey] = field.type === "string" ? value.toString().toLowerCase() : value;
            } else {
                console.warn(`Invalid value for ${fieldKey}: ${value}`);
            }
        }
    }

    return result;
}

// Validation function based on field type
function validateFieldValue(type, value, options) {
    switch (type) {
        case 'string':
            return typeof value === 'string';  // Ensure value is a string
        case 'number':
            // Allow string that can be converted to a number
            const numValue = Number(value);  // Convert to number
            return !isNaN(numValue) && typeof numValue === 'number';  // Ensure it's a valid number
        case 'datetime':
            return !isNaN(new Date(value).getTime());  // Ensure value is a valid date
        case 'enum':
            // Validate if value is exactly in the options array for enum (exact match)
            if (options && Array.isArray(options)) {
                return options.some(option => option.key === value.toString()); // Exact match (case-sensitive)
            }
            return false;  // Invalid if no options or the value is not in options
        default:
            return false;  // Invalid type
    }
}
}