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
        try {
            const response = await callBoxAIAPI(accessToken, job.prompt, job.boxFileId, job.content);
            console.log(JSON.stringify(JSON.parse(job.content)) + "::" + JSON.stringify(JSON.parse(response.answer)));
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async createAiTextGen1(job, accessToken) {
        const _this = this;
        const it = [];

        const item = {
            id: job.boxFileId,
            type: "file"
        };
        
        if (content) {
            item.content = JSON.stringify(job.content);
        }
        
        it.push(item);
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
                    items: it,
                    dialogueHistory:this.dialogueHistory,
                    "ai_agent_config": {
                        "basic_text": {
                            "llm_endpoint_params": {
                                "type": "openai_params",
                                "frequency_penalty": 1.5,
                                "presence_penalty": 1.5,
                                "stop": "<|im_end|>",
                                "temperature": 2,
                                "top_p": 2
                                }
                        }
                    }
                }),
                success: function(response) {
                    _this.dialogueHistory.push({prompt:job.prompt,answer:response.answer,createdAt:response.created_at});
                    console.log(JSON.stringify(JSON.parse(job.content)) + "::" + JSON.stringify(JSON.parse(response.answer)));
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
                outputType: $("input[name='docFormat']:checked").val(),
                documentGenerationData: [
                    {
                        generatedFileName: job.fileName,
                        userInput: removeTimeFromDates(job.userInput),
                    },
                ],
            });
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
function callBoxAIAPI(accessToken, prompt, boxFileId, content) {
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
                prompt: prompt,
                items: [
                    {
                        id: boxFileId,
                        type: "file",
                        content: JSON.stringify(content),
                    },
                ]
            }),
            success: function(response) {
                resolve(response); // Resolve the Promise with API response
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(new Error(`AI API Error: ${textStatus}, ${errorThrown}, ${jqXHR.responseText}`));
            },
        });
    });
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
    let failed = 0;
    let inProgressCount = 0;
    const batchesArray = Array.from(docgenBatches.values());
    
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
                                console.log('adding to completed batches ' + entry.templateFile.id);
                                
                                try {
                                    console.log(metadataMap);
                                let template = metadataMap.find(f => entry.templateFile.id === f.id);
                                console.log('apply ' + value.userInput + ' to ' + template.template.templateKey + ' for file ' + entry.outputFile.id);
                                    await client.fileMetadata.createFileMetadataById(entry.outputFile.id, 'enterprise',template.template.templateKey,  mapFieldValues(template.fieldMappings,value.userInput,template.template.fields));
                                }
                                catch(error) {
                                    console.log(error);
                                }
                                completedBatches.add(key); 

                            } else if (entry.status === "completed_with_error" ) {
                                completed_with_errors++;
                                console.log('adding to completed with errors batches');
                                completedWithErrorBatches.add(key); 

                            } else if(entry.status==="failed") {
                                failed++;
                                console.log('adding to failed batches');
                                failedBatches.add(key);

                            }else {
                                inProgressCount++;
                                allCompleted = false;
                            }
                        }
                    }
                    } catch (error) {
                        console.error(`Error fetching job ${value.id}:`, error);
                        failed++;
                        console.log('adding to completed with errors batches');
                        failed.add(key); 
                        return docgenBatches[key]; // Keep batch if there's an error
                    }
            }
                
            return docgenBatches[key]; // Keep ongoing batches
        })
    );
    console.log(`Completed: ${completedCount}, Completed with errors: ${completed_with_errors}, Failed ${failed} In Progress: ${inProgressCount}`);
    return { completedCount, completed_with_errors,failed,inProgressCount, remainingBatches: docgenBatches };
}
// Example Usage

function generateFieldHints(jsonString) {
    const ignoreKeywords = ["date", "number", "id"]; // Ignore fields containing these words
    const hintCategories = {
        "Technology": ["AI", "Cybersecurity", "Cloud Computing", "Software Development", "IoT"],
        "Finance": ["Banking", "Investment", "Accounting", "FinTech", "Personal Finance"],
        "Insurance": ["Health Insurance", "Auto Insurance", "Life Insurance", "Property Insurance", "Reinsurance"],
        "Healthcare": ["Hospitals", "Pharmaceuticals", "Telemedicine", "Mental Health", "Medical Devices"],
        "Retail": ["E-commerce", "Brick-and-Mortar", "Luxury Goods", "Fast Fashion", "Grocery Stores"],
        "Education": ["K-12", "Higher Education", "E-Learning", "Vocational Training", "EdTech"],
        "Real Estate": ["Residential", "Commercial", "Property Management", "REITs", "Luxury Real Estate"],
        "Manufacturing": ["Automotive", "Textile", "Electronics", "Heavy Machinery", "Food Processing"],
        "Transportation": ["Aviation", "Shipping", "Public Transit", "Logistics", "Ride-Sharing"],
        "Hospitality": ["Hotels", "Resorts", "Restaurants", "Event Planning", "Cruise Lines"],
        "Legal": ["Corporate Law", "Intellectual Property", "Criminal Law", "Family Law", "Real Estate Law"],
        "Marketing": ["Digital Marketing", "SEO", "Content Marketing", "Brand Management", "Advertising"],
        "Construction": ["Residential", "Commercial", "Infrastructure", "Green Building", "Project Management"],
        "E-commerce": ["Dropshipping", "Marketplaces", "Subscription Services", "B2B E-commerce", "Direct-to-Consumer"],
        "Telecommunications": ["5G", "Broadband", "Mobile Networks", "Satellite Communications", "VoIP"],
        "Entertainment": ["Streaming", "Gaming", "Film Industry", "Music Industry", "Theater"],
        "Energy": ["Renewable Energy", "Oil & Gas", "Nuclear Energy", "Energy Storage", "Smart Grids"],
        "Aerospace": ["Commercial Aviation", "Space Exploration", "Defense", "Aircraft Manufacturing", "Drones"],
        "Government": ["Policy Making", "Public Safety", "Infrastructure", "Defense", "Education"],
        "Non-Profit": ["Charity", "Environmental Organizations", "Education Initiatives", "Healthcare Aid", "Animal Welfare"],
        "Automotive": ["Electric Vehicles", "Autonomous Vehicles", "Luxury Cars", "Motorsports", "Aftermarket Parts"],
        "Pharmaceutical": ["Drug Development", "Biotechnology", "Clinical Trials", "Generic Drugs", "Vaccines"]
    };
    
    // Select a random category
    const selectedCategory = Object.keys(hintCategories)[Math.floor(Math.random() * Object.keys(hintCategories).length)];
    
    // Select a random subcategory from the chosen category
    const selectedSubcategory = hintCategories[selectedCategory][Math.floor(Math.random() * hintCategories[selectedCategory].length)];
    
    // Return the result as "category subcategory"
    const categoryHint = `${selectedCategory} ${selectedSubcategory}`;
    // Select a single random category for all hints in this function call
    //const selectedCategory = hintCategories[Math.floor(Math.random() * hintCategories.length)];

    function getRandomHint(fieldName) {
        if (fieldName.toLowerCase().includes('summary') || fieldName.toLowerCase().includes('description')) {
            return `Use a realistic but random ${categoryHint} ${Math.floor(Math.random() * 3) + 2} paragraph text for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        } else {
            return `Use a ${getRandomLength()} realistic but random ${categoryHint} value for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
        }
    }

    function traverse(obj) {
        let newObj = Array.isArray(obj) ? [] : {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    newObj[key] = traverse(obj[key]); // Recursively process nested objects
                } else {
                    if (obj[key] == null || obj[key] === 'null' || obj[key].startsWith('{{')) {
                        if (ignoreKeywords.some(kw => key.toLowerCase().includes(kw))) {
                            if(key.toLowerCase().includes('date')) {
                                newObj[key] = getRandomDateInstruction(key);
                            }
                            else {
                                newObj[key] = 'use random ' + key;
                            }
                            
                        } else {
                            newObj[key] = getRandomHint(key);
                        }
                    } else if(obj[key].startsWith('Use one of these values:')) {
                        newObj[key] = getRandomValueFromString(obj[key]);

                    } else {
                        newObj[key] = obj[key].replace('random',getRandomLength() + ' ' + categoryHint + ' random');//  + ' and ' + getRandomHint(key) ; 
                    }
                }
            }
        }
        return newObj;
    }

    try {
        const parsedData = jsonString;
        let parsed = traverse(parsedData);
        if (!parsed.hasOwnProperty('fileName')) {
            parsed['fileName'] = getRandomHint('fileName');
        }
        return JSON.stringify(parsed, null, 2); // Pretty-print JSON output
    } catch (error) {
        console.error("Invalid JSON:", error);
        return jsonString; // Return original JSON if parsing fails
    }
}
function getRandomValueFromString(input) {
    // Extract the part after "Use one of these values:"
    let valuesPart = input.split("Use one of these values:")[1];

    // Trim spaces and split by comma to get an array
    let valuesArray = valuesPart.split(",").map(val => val.trim());

    // Pick a random value from the array
    return valuesArray[Math.floor(Math.random() * valuesArray.length)];
}
function getRandomDateInstruction(key ) {
    const now = new Date();
    const past25Years = new Date();
    past25Years.setFullYear(now.getFullYear() - 25);

    // Generate two random dates within the last 25 years
    const x = new Date(past25Years.getTime() + Math.random() * (now.getTime() - past25Years.getTime()));
    const y = new Date(past25Years.getTime() + Math.random() * (now.getTime() - past25Years.getTime()));

    // Ensure x is the earlier date and y is the later date
    const start = x < y ? x : y;
    const end = x < y ? y : x;

    // Format dates as YYYY-MM-DD
    const startDate = start.toISOString().split("T")[0];
    const endDate = end.toISOString().split("T")[0];

    return `Use random ${key} between ${startDate} and ${endDate}`;
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
async function loadDocGenTemplates() {
    $('#allTemplates').empty();
    let docgenTemplates = await getDocGenTemplates();
            docgenTemplates.forEach(function(temp) {
                $('#allTemplates').append($('<option>', {
                    value: temp.file.id,
                    text: temp.file_name,
                }));
               
            })
}
async function getDocGenTemplates() {
    let url = "https://api.box.com/2.0/docgen_templates?limit=1000";

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
function getRandomLength() {
    const options = ["tiny", "very short", "short", "compact", "medium", "moderate", "long", "extended", "very long", "massive"];   
    return options[Math.floor(Math.random() * options.length)];
}
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
                switch(field.type) {
                    case 'string':
                    case 'enum':
                    case 'date':
                        result[fieldKey] = value;
                        break;
                    case 'float':
                        result[fieldKey] = extractNumber(value);
                    default:
                        break;
                }
                
            } else {
                console.warn(`Invalid value for ${fieldKey}: ${value}`);
            }
        }
    }

    return result;
}
function extractNumber(value) {
    if (!value) return null; // Handle empty or null values
    return parseFloat(value.replace(/[^0-9.-]/g, ''));
}
// Validation function based on field type
function validateFieldValue(type, value, options) {
    switch (type) {
        case 'string':
            return typeof value === 'string';  // Ensure value is a string
        case 'float':
            // Allow string that can be converted to a number
            const numValue = extractNumber(value);  // Convert to number
            console.log(value + "-->" + numValue);
            return !isNaN(numValue) && typeof numValue === 'number';  // Ensure it's a valid number
        case 'date':
            return !isNaN(new Date(value).getTime());
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


async function getEid() {
    let user = await  client.users.getUserMe({"fields":["id,name,enterprise"]});
    eid = user.enterprise.id;
}

function transformStaticJson(json) {
    return Object.fromEntries(
        Object.entries(json).map(([key, value]) => {
            const match = value.match(/^Choose one of these values: (.+)$/);
            if (match) {
                const options = match[1].split(", ").map(option => option.trim());
                return [key, options[Math.floor(Math.random() * options.length)]];
            }
            return [key, value];
        })
    );
}

function getCountryPart() {
    let value = $("#countrySelect").find("option:selected").val();
    if(value==='NONE') {
        return '';
    }
    else if(value==='Marvel/DC') {
        return 'Base values such as names, addresses, cities and company names on : Marvel and DC comic book characters, places and names';
    }
    else {
        return 'Base country specific values such as names, addresses, postcodes, currency etc on this country: ' +  $("#countrySelect").find("option:selected").val();
    }

}
function getPrompt(fileName) {
    return 'Given this json object, for each attribute return realistic but random value using the hint in the value for each field. ' + getCountryPart() + 
    '. For any numberic value to do with money such as price, use a the currency symbol for the country and separators for values. Do not use values from the document itself. For any person names use ' + generateNameCriteria() + '. ' + 
    //'Also include a real world business value for fileName based on this value:' + fileName + ' - call the attribute fileName and this should be a root attribute of the returned json. Extension is always PDF. Do not use the word random in the file name' + 
    'For any dates returned, use RFC399 format. For any dates or years or other time based values select a random value in the last 25 years unless otherwise instructed' +  
    ' When you use numbers in values not representing an actual number such as ID numbers, invoice numbers, purchase order numbers, account numbers etc., do NOT use consequtive digits like 1234 or 5432. ' + 
    'Only return the valid JSON, do not start the answer with three backticks and the word json. '
}
function removeTimeFromDates(obj) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

    function traverse(data) {
        if (Array.isArray(data)) {
            return data.map(traverse);
        } else if (typeof data === "object" && data !== null) {
            let newObj = {};
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    newObj[key] = traverse(data[key]);
                }
            }
            return newObj;
        } else if (typeof data === "string" && dateRegex.test(data)) {
            return data.split("T")[0]; // Remove time part
        }
        return data;
    }

    return traverse(obj);
}


async function fetchTextRepresentationFromBox(fileId, token) {
    const json = tagsMap.find(item => item.id === fileId);
    if(json) {
        return json.json;
    }
    else {
        const url = `https://api.box.com/2.0/files/${fileId}?fields=representations`; // URL to fetch the file representations

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch file representations from Box");

            let data = await response.json();
            // Find the extracted_text representation
            const textRepresentation = data.representations.entries.find(rep => rep.representation === 'extracted_text'); 

            if (!textRepresentation) throw new Error("Extracted text representation not found");

            const infoUrl = textRepresentation.info.url;
            response = await fetch(infoUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            data = await response.json();

            // Replace the `{+asset_path}` part of the URL template, if necessary (it might be empty)
            const contentUrl = data.content.url_template.replace("{+asset_path}", ""); // In this case, it may not have an asset path

            // Fetch the extracted text content
            const textResponse = await fetch(contentUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!textResponse.ok) throw new Error("Failed to fetch text content from the extracted text representation");

            const text = await textResponse.text();
            const jsonData = extractTagsFromText(text);
            tagsMap.push({id:fileId,json:jsonData})


            return jsonData
        } catch (error) {
            console.error("Error fetching text representation:", error);
            return null;
        }
    }
}

function extractTagsFromText(text) {
    // Match all placeholders (e.g., {{vendor.name}}, {{pricing.total}}, {{Name}})
    const tagRegex = /\{\{(.*?)\}\}/g;
    let match;
    const tags = new Set();

    while ((match = tagRegex.exec(text)) !== null) {
        tags.add(match[1].trim());
    }

    // Generate structured JSON
    let jsonStructure = {};
    let itemsObject = {}; // Store row.* fields in a single object

    tags.forEach(tag => {
        if (tag === "endtablerow" || tag.startsWith("tablerow")) return; // Skip unwanted tags

        if (tag.startsWith("row.")) {
            // Store all row.* values inside a single object
            let fieldName = tag.replace("row.", "");
            itemsObject[fieldName] = `{{${tag}}}`;
        } else if (tag.includes(".")) {
            // Handle dot-separated tags (e.g., vendor.name)
            let parts = tag.split(".");
            let obj = jsonStructure;

            for (let i = 0; i < parts.length - 1; i++) {
                if (!obj[parts[i]]) obj[parts[i]] = {};
                obj = obj[parts[i]];
            }
            obj[parts[parts.length - 1]] = `{{${tag}}}`;
        } else {
            // Handle single-word tags (e.g., {{Name}})
            jsonStructure[tag] = `{{${tag}}}`;
        }
    });

    // If we have row.* attributes, wrap them in an array
    if (Object.keys(itemsObject).length > 0) {
        jsonStructure["items"] = [itemsObject]; // Array with one object
    }

    return jsonStructure;
}



function fixQuotes(jsonString) {
    return jsonString
        .replace(/[\u201C\u201D\u275D\u275E]/g, '"') // Replace fancy quotes “ ” with "
        .replace(/”/g, '"') // Extra check for some cases
        .trim(); // Remove unwanted spaces
}


function convertArrayToNestedJsonWithArrays(array) {
    let result = {};
    // Process each item in the array
    array.forEach(item => {
        if (item.tag_type === 'conditional') {
            return; // Ignore this entry and continue
        }
        let paths = item.json_paths;
        let value = item.tag_content;
        let obj = result;

        // Check if tag type is table-loop (array)
        const isTableLoop = item.tag_type === 'table-loop';

        paths.forEach((path, index) => {
            const key = path.split('.').pop(); // Extract only the last part

            if (index === paths.length - 1) {
                if (isTableLoop) {
                    obj[key] = []; // Initialize an array for table-loop
                } else {
                    obj[key] = value;
                }
            } else {
                obj[key] = obj[key] || {};
                obj = obj[key];
            }
        });
    });

    // Process table-loop items separately to ensure correct row grouping
    Object.keys(result).forEach(key => {
        if (Array.isArray(result[key])) {
            let itemRows = [];

            array.forEach(subItem => {
                if (subItem.json_paths[0].split('.').pop() === key && subItem.tag_type !== "table-loop") {
                    let fieldKey = subItem.json_paths[1].split('.').pop();
                    let fieldValue = subItem.tag_content;

                    // Find the row that we are adding to
                    let currentRow = itemRows[itemRows.length - 1];

                    if (!currentRow || currentRow.hasOwnProperty(fieldKey)) {
                        currentRow = {}; // Start a new row object if necessary
                        itemRows.push(currentRow);
                    }

                    currentRow[fieldKey] = fieldValue;
                }
            });

            result[key] = itemRows; // Assign the properly structured rows
        }
    });

    return result;
}

function fetchTemplateTags(templateId, token) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://api.box.com/2.0/docgen_templates/${templateId}/tags`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
            success: function(response) {
                resolve(response.entries);
            },
            error: function(xhr, status, error) {
                console.error(`Error fetching tags for template ${templateId}:`, error);
                reject([]);
            }
        });
    });
}