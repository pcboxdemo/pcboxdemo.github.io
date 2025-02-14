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
            this.jobResults.set(job.uniqueId, result); // Store result

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
        batchesArray.map(async (docgenBatch) => {
            console.log('batches:' + batchesArray.length + "::completedBatches:" + completedBatches.size);
            if (completedBatches.has(docgenBatch.id)) {
                console.log('skipping: completed');
                // Skip API call if batch is already marked as completed
                return docgenBatch;
            }
            if (completedWithErrorBatches.has(docgenBatch.id)) {
                console.log('skipping: completed with errors');
                // Skip API call if batch is already marked as completed
                return docgenBatch;
            }
            //only check 10 to avoid 
            if(i<=10) {
                try {
                    const jobDetails = await client.docgen.getDocgenBatchJobByIdV2025R0(docgenBatch.id);
                    i++;
                    if (Array.isArray(jobDetails.entries)) {
                        let allCompleted = true;

                        for (const entry of jobDetails.entries) {
                            if (entry.status === "completed") {
                                completedCount++;
                                console.log('adding to completed batches');
                                completedBatches.add(docgenBatch.id); 

                            } else if (entry.status === "completed_with_error") {
                                completed_with_errors++;
                                console.log('adding to completed with errors batches');
                                completedWithErrorBatches.add(docgenBatch.id); 

                            } else {
                                inProgressCount++;
                                allCompleted = false;
                            }
                        }
                    }
                    } catch (error) {
                        console.error(`Error fetching job ${docgenBatch.id}:`, error);
                        return docgenBatch; // Keep batch if there's an error
                    }
            }
                
            return docgenBatch; // Keep ongoing batches
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
                        console.log(obj[key]);
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
