/**
 * AI Randomness Test Harness
 * Test and optimize Box AI parameters for maximum data diversity
 */

class AITestProcessor {
    constructor(client, accessToken) {
        this.client = client;
        this.accessToken = accessToken;
        this.dialogueHistory = [];
    }

    async runTest(testConfig) {
        const { templateId, iterations, prompt, fieldHints, tagsJson, aiParams, useDialogueHistory, generateNewPrompt } = testConfig;
        const results = [];
        
        console.log(`Starting test with ${iterations} iterations using parameters:`, aiParams);

        for (let i = 0; i < iterations; i++) {
            try {
                console.log(`Running iteration ${i + 1}/${iterations}`);
                
                // Update progress
                const progress = ((i + 1) / iterations) * 100;
                $('#testProgress .progress-bar').css('width', `${progress}%`);

                // Generate prompt and field hints for this iteration
                const currentPrompt = generateNewPrompt ? getPrompt(`Test Document ${i + 1}`) : prompt;
                const currentFieldHints = generateNewPrompt ? generateFieldHints(tagsJson) : fieldHints;

                // Call AI with parameters
                const response = await callBoxAIAPIWithParams(
                    this.accessToken,
                    currentPrompt,
                    templateId,
                    currentFieldHints,
                    aiParams,
                    useDialogueHistory ? this.dialogueHistory : null
                );

                // Parse the response with defensive error handling
                const data = parseAIResponse(response.answer);
                
                // Store result
                const result = {
                    iteration: i + 1,
                    timestamp: new Date().toISOString(),
                    aiParams: { ...aiParams },
                    data: data,
                    rawResponse: response
                };

                results.push(result);

                // Update dialogue history if enabled
                if (useDialogueHistory) {
                    this.dialogueHistory.push({
                        prompt: prompt,
                        answer: response.answer,
                        createdAt: response.created_at
                    });
                }

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`Iteration ${i + 1} failed:`, error);
                // Continue with next iteration
            }
        }

        console.log(`Test completed. Generated ${results.length} results.`);
        return results;
    }
}

/**
 * Analyze diversity metrics across all test results
 */
function analyzeDiversityMetrics(results) {
    if (results.length === 0) {
        return {
            overallDiversity: 0,
            uniqueCombinations: 0,
            averageFieldDiversity: 0,
            problemFields: []
        };
    }

    // Flatten all results to get field paths
    const allFieldPaths = new Set();
    results.forEach(result => {
        const flattened = flattenObject(result.data);
        Object.keys(flattened).forEach(path => allFieldPaths.add(path));
    });

    // Analyze each field
    const fieldAnalyses = [];
    let totalFieldDiversity = 0;
    let problemFields = [];

    allFieldPaths.forEach(fieldPath => {
        const analysis = analyzeFieldDiversity(results, fieldPath);
        fieldAnalyses.push(analysis);
        totalFieldDiversity += analysis.diversity;

        if (analysis.diversity < 70) {
            problemFields.push({
                path: fieldPath,
                diversity: analysis.diversity,
                uniqueValues: analysis.uniqueValues,
                totalValues: analysis.totalValues,
                patterns: analysis.patterns
            });
        }
    });

    // Calculate overall metrics
    const averageFieldDiversity = fieldAnalyses.length > 0 ? totalFieldDiversity / fieldAnalyses.length : 0;
    const uniqueCombinations = calculateUniqueCombinations(results);
    const overallDiversity = results.length > 0 ? calculateOverallDiversity(results[0], results) : 0;

    return {
        overallDiversity,
        uniqueCombinations,
        averageFieldDiversity,
        problemFields,
        fieldAnalyses
    };
}

/**
 * Analyze diversity for a specific field across all results
 */
function analyzeFieldDiversity(results, fieldPath) {
    const values = [];
    
    // Extract values for this field from all results
    results.forEach(result => {
        const value = getValueByPath(result.data, fieldPath);
        if (value !== undefined && value !== null) {
            values.push(String(value));
        }
    });

    if (values.length === 0) {
        return {
            path: fieldPath,
            diversity: 0,
            uniqueValues: 0,
            totalValues: 0,
            patterns: []
        };
    }

    // Count unique values
    const uniqueValues = new Set(values).size;
    const diversity = (uniqueValues / values.length) * 100;

    // Detect patterns
    const patterns = detectPatterns(values);

    return {
        path: fieldPath,
        diversity,
        uniqueValues,
        totalValues: values.length,
        patterns,
        values: values
    };
}

/**
 * Detect patterns in field values
 */
function detectPatterns(values) {
    const patterns = [];

    // Check for consecutive numbers
    const numbers = values.filter(v => !isNaN(v)).map(v => parseFloat(v));
    if (numbers.length > 2) {
        const sorted = [...numbers].sort((a, b) => a - b);
        let consecutive = true;
        for (let i = 1; i < sorted.length; i++) {
            if (sorted[i] - sorted[i-1] !== 1) {
                consecutive = false;
                break;
            }
        }
        if (consecutive) {
            patterns.push('consecutive_numbers');
        }
    }

    // Check for repeated values
    const valueCounts = {};
    values.forEach(v => {
        valueCounts[v] = (valueCounts[v] || 0) + 1;
    });
    
    const maxCount = Math.max(...Object.values(valueCounts));
    if (maxCount > values.length * 0.5) {
        patterns.push('frequent_repetition');
    }

    // Check for similar strings (Levenshtein distance)
    if (values.length > 1) {
        let similarCount = 0;
        for (let i = 0; i < values.length - 1; i++) {
            for (let j = i + 1; j < values.length; j++) {
                const distance = levenshteinDistance(values[i], values[j]);
                const maxLength = Math.max(values[i].length, values[j].length);
                if (maxLength > 0 && distance / maxLength < 0.3) {
                    similarCount++;
                }
            }
        }
        if (similarCount > values.length * 0.3) {
            patterns.push('similar_strings');
        }
    }

    return patterns;
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

/**
 * Calculate unique combinations across all results
 */
function calculateUniqueCombinations(results) {
    const combinations = new Set();
    
    results.forEach(result => {
        const flattened = flattenObject(result.data);
        const combination = JSON.stringify(flattened);
        combinations.add(combination);
    });
    
    return combinations.size;
}

/**
 * Calculate overall diversity score for a single result
 */
function calculateOverallDiversity(result, allResults) {
    if (allResults.length <= 1) return 100;
    
    const currentFlattened = flattenObject(result.data);
    let totalSimilarity = 0;
    let comparisonCount = 0;
    
    allResults.forEach(otherResult => {
        if (otherResult === result) return;
        
        const otherFlattened = flattenObject(otherResult.data);
        const similarity = calculateSimilarity(currentFlattened, otherFlattened);
        totalSimilarity += similarity;
        comparisonCount++;
    });
    
    const averageSimilarity = comparisonCount > 0 ? totalSimilarity / comparisonCount : 0;
    return Math.max(0, 100 - (averageSimilarity * 100));
}

/**
 * Calculate similarity between two flattened objects
 */
function calculateSimilarity(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const allKeys = new Set([...keys1, ...keys2]);
    
    let matches = 0;
    let total = allKeys.size;
    
    allKeys.forEach(key => {
        const val1 = obj1[key];
        const val2 = obj2[key];
        
        if (val1 === val2) {
            matches++;
        } else if (val1 !== undefined && val2 !== undefined) {
            // Check for string similarity
            if (typeof val1 === 'string' && typeof val2 === 'string') {
                const distance = levenshteinDistance(val1, val2);
                const maxLength = Math.max(val1.length, val2.length);
                if (maxLength > 0 && distance / maxLength < 0.2) {
                    matches += 0.5; // Partial match
                }
            }
        }
    });
    
    return total > 0 ? matches / total : 0;
}

/**
 * Get value by dot-notation path from object
 */
function getValueByPath(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}


/**
 * Enhanced AI API call with configurable parameters
 */
function callBoxAIAPIWithParams(accessToken, prompt, boxFileId, content, aiParams = {}, dialogueHistory = null) {
    return new Promise((resolve, reject) => {
        const requestData = {
            mode: "single_item_qa",
            prompt: prompt,
            items: [
                {
                    id: boxFileId,
                    type: "file",
                    content: JSON.stringify(content),
                },
            ]
        };

        // Add AI agent config if parameters are provided
        if (aiParams && Object.keys(aiParams).length > 0) {
            requestData.ai_agent_config = {
                basic_text: {
                    llm_endpoint_params: {
                        type: "openai_params",
                        temperature: aiParams.temperature || 1.0,
                        frequency_penalty: aiParams.frequency_penalty || 0.5,
                        presence_penalty: aiParams.presence_penalty || 0.5,
                        top_p: aiParams.top_p || 0.95,
                        stop: "<|im_end|>"
                    }
                }
            };
        }

        // Add dialogue history if provided
        if (dialogueHistory && Array.isArray(dialogueHistory)) {
            requestData.dialogueHistory = dialogueHistory;
        }

        $.ajax({
            url: "https://api.box.com/2.0/ai/ask",
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(requestData),
            success: function(response) {
                resolve(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(new Error(`AI API Error: ${textStatus}, ${errorThrown}, ${jqXHR.responseText}`));
            },
        });
    });
}

/**
 * Load docgen templates for the test harness
 */
async function loadDocGenTemplates() {
    console.log('loadDocGenTemplates function called');
    $('#templateSelect').empty().append('<option value="">Select a template...</option>');
    
    try {
        // Check if getDocGenTemplates function exists (from docgen.js)
        if (typeof getDocGenTemplates === 'function') {
            console.log('Using getDocGenTemplates from docgen.js');
            let docgenTemplates = await getDocGenTemplates();
            console.log('Retrieved templates:', docgenTemplates);
            // Sort templates alphabetically by file_name
            docgenTemplates.sort((a, b) => a.file_name.localeCompare(b.file_name));
            
            docgenTemplates.forEach(function(temp) {
                console.log('Adding template:', temp.file_name);
                $('#templateSelect').append($('<option>', {
                    value: temp.file.id,
                    text: temp.file_name,
                }));
            });
        } else {
            console.log('getDocGenTemplates not found, using direct method');
            // Fallback: load templates directly if getDocGenTemplates is not available
            await loadDocGenTemplatesDirect();
        }
    } catch (error) {
        console.error('Failed to load docgen templates:', error);
        $('#templateSelect').append('<option value="">Error loading templates</option>');
    }
}

/**
 * Direct template loading fallback
 */
async function loadDocGenTemplatesDirect() {
    console.log('loadDocGenTemplatesDirect called');
    const accessToken = sessionStorage.getItem("token");
    console.log('Access token available:', !!accessToken);
    let url = "https://api.box.com/2.0/docgen_templates?limit=1000";

    try {
        console.log('Making AJAX request to:', url);
        const response = await $.ajax({
            url: url,
            type: "get",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        });
        
        console.log('AJAX response received:', response);
        const docgenTemplates = response.entries;
        console.log('Templates found:', docgenTemplates.length);
        docgenTemplates.sort((a, b) => a.file_name.localeCompare(b.file_name));
        
        docgenTemplates.forEach(function(temp) {
            console.log('Adding template (direct):', temp.file_name);
            $('#templateSelect').append($('<option>', {
                value: temp.file.id,
                text: temp.file_name,
            }));
        });
    } catch (error) {
        console.error('Failed to load templates directly:', error);
        throw error;
    }
}

/**
 * Export test results to various formats
 */
function exportResultsToCSV(results) {
    if (results.length === 0) return '';
    
    // Get all field paths
    const allFieldPaths = new Set();
    results.forEach(result => {
        const flattened = flattenObject(result.data);
        Object.keys(flattened).forEach(path => allFieldPaths.add(path));
    });
    
    const fieldPaths = Array.from(allFieldPaths).sort();
    
    // Create CSV header
    const header = ['Iteration', 'Timestamp', 'Temperature', 'Frequency_Penalty', 'Presence_Penalty', 'Top_P', ...fieldPaths];
    
    // Create CSV rows
    const rows = results.map(result => {
        const flattened = flattenObject(result.data);
        const row = [
            result.iteration,
            result.timestamp,
            result.aiParams.temperature,
            result.aiParams.frequency_penalty,
            result.aiParams.presence_penalty,
            result.aiParams.top_p
        ];
        
        fieldPaths.forEach(path => {
            const value = flattened[path] || '';
            row.push(`"${String(value).replace(/"/g, '""')}"`);
        });
        
        return row.join(',');
    });
    
    return [header.join(','), ...rows].join('\n');
}

/**
 * Generate diversity report
 */
function generateDiversityReport(results) {
    const metrics = analyzeDiversityMetrics(results);
    
    const report = {
        summary: {
            totalIterations: results.length,
            overallDiversity: metrics.overallDiversity,
            uniqueCombinations: metrics.uniqueCombinations,
            averageFieldDiversity: metrics.averageFieldDiversity,
            problemFieldsCount: metrics.problemFields.length
        },
        parameters: results.length > 0 ? results[0].aiParams : {},
        problemFields: metrics.problemFields,
        recommendations: generateRecommendations(metrics)
    };
    
    return report;
}

/**
 * Generate recommendations based on diversity metrics
 */
function generateRecommendations(metrics) {
    const recommendations = [];
    
    if (metrics.overallDiversity < 60) {
        recommendations.push('Consider increasing temperature to 1.5-2.0 for more randomness');
    }
    
    if (metrics.averageFieldDiversity < 70) {
        recommendations.push('Increase frequency_penalty and presence_penalty to reduce repetition');
    }
    
    if (metrics.problemFields.length > 0) {
        recommendations.push(`Focus on improving diversity for ${metrics.problemFields.length} problematic fields`);
    }
    
    if (metrics.uniqueCombinations < metrics.totalIterations * 0.8) {
        recommendations.push('Consider using dialogue history to maintain context across iterations');
    }
    
    return recommendations;
}

/**
 * Helper functions that might be needed if not loaded from docgen.js
 */

// Check if functions exist, if not define them
if (typeof fetchTemplateTags === 'undefined') {
    function fetchTemplateTags(templateId, token) {
        function tryFetch(resolve, reject) {
            $.ajax({
                url: `https://api.box.com/2.0/docgen_templates/${templateId}/tags`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                success: function(response, textStatus, xhr) {
                    // If the response is a processing message, retry
                    if (xhr.status === 202 && response && response.message === "Processing tags for this file.") {
                        setTimeout(() => tryFetch(resolve, reject), 5000);
                    } else {
                        resolve(response.entries);
                    }
                },
                error: function(xhr, status, error) {
                    // If 202 with processing message, retry
                    if (xhr.status === 202 && xhr.responseJSON && xhr.responseJSON.message === "Processing tags for this file.") {
                        setTimeout(() => tryFetch(resolve, reject), 5000);
                    } else {
                        console.error(`Error fetching tags for template ${templateId}:`, error);
                        reject([]);
                    }
                }
            });
        }
        return new Promise(tryFetch);
    }
}

if (typeof convertArrayToNestedJsonWithArrays === 'undefined') {
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
}

if (typeof generateFieldHints === 'undefined') {
    function generateFieldHints(jsonString) {
        const ignoreKeywords = ["date", "number", "id"];
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
            "Pharmaceutical": ["Drug Development", "Biotechnology", "Clinical Trials", "Generic Drugs", "Vaccines"],
            "Food & Beverage": ["Restaurants", "Breweries", "Wineries", "Food Processing", "Catering"],
            "Fashion & Apparel": ["Luxury Fashion", "Streetwear", "Athletic Wear", "Accessories", "Sustainable Fashion"],
            "Sports & Fitness": ["Professional Sports", "Fitness Centers", "Outdoor Recreation", "Sports Equipment", "Esports"],
            "Media & Publishing": ["News Organizations", "Book Publishing", "Magazines", "Digital Media", "Podcasting"],
            "Consulting": ["Management Consulting", "IT Consulting", "Strategy Consulting", "Financial Advisory", "HR Consulting"],
            "Law Enforcement": ["Police Departments", "Federal Agencies", "Detective Work", "Forensics", "Community Policing"],
            "Agriculture & Farming": ["Crop Farming", "Livestock Management", "Organic Agriculture", "Agricultural Technology", "Food Distribution"],
            "Environmental Services": ["Waste Management", "Recycling", "Environmental Consulting", "Conservation", "Green Energy Services"],
            "Human Resources": ["Recruitment", "Employee Benefits", "Training & Development", "Workplace Safety", "Performance Management"],
            "Research & Development": ["Scientific Research", "Product Development", "Clinical Research", "Market Research", "Innovation Labs"],
            "Travel & Tourism": ["Tour Operators", "Travel Agencies", "Destination Management", "Hospitality Services", "Adventure Tourism"]
        };
        
        // Select a random category
        const selectedCategory = Object.keys(hintCategories)[Math.floor(Math.random() * Object.keys(hintCategories).length)];
        
        // Select a random subcategory from the chosen category
        const selectedSubcategory = hintCategories[selectedCategory][Math.floor(Math.random() * hintCategories[selectedCategory].length)];
        
        // Return the result as "category subcategory"
        const categoryHint = `${selectedCategory} ${selectedSubcategory}`;

        function getRandomHint(fieldName) {
            if (fieldName.toLowerCase().includes('summary') || fieldName.toLowerCase().includes('description')) {
                return `Use a realistic but random ${categoryHint} ${Math.floor(Math.random() * 3) + 2} paragraph text for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
            } else {
                return `Use a ${getRandomLength()} realistic but random ${categoryHint} value for ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
            }
        }

        function getRandomLength() {
            const options = ["tiny", "very short", "short", "compact", "medium", "moderate", "long", "extended", "very long", "massive"];   
            return options[Math.floor(Math.random() * options.length)];
        }

        function getRandomDateInstruction(key) {
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

        function getRandomValueFromString(input) {
            // Extract the part after "Use one of these values:"
            let valuesPart = input.split("Use one of these values:")[1];

            // Trim spaces and split by comma to get an array
            let valuesArray = valuesPart.split(",").map(val => val.trim());

            // Pick a random value from the array
            return valuesArray[Math.floor(Math.random() * valuesArray.length)];
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
                            newObj[key] = obj[key].replace('random',getRandomLength() + ' ' + categoryHint + ' random');
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
}

if (typeof getPrompt === 'undefined') {
    function getPrompt(fileName) {
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

        function generateNameCriteria() {
            const gender = Math.random() < 0.5 ? "male" : "female";
            const x = Math.floor(Math.random() * 6) + 3; // Random number between 3 and 8
            const y = Math.floor(Math.random() * 7) + 4; // Random number between 4 and 10
          
            return `${gender} name with ${x} letters in first name and ${y} letters in last name like this: firstName lastName`;
        }

        return 'Given this json object, for each attribute return realistic but random value using the hint in the value for each field. ' + getCountryPart() + 
        '. For any numberic value to do with money such as price, use a the currency symbol for the country and separators for values. Do not use values from the document itself. For any person names use ' + generateNameCriteria() + '. ' + 
        'For any dates returned, use RFC399 format. For any dates or years or other time based values select a random value in the last 25 years unless otherwise instructed' +  
        ' When you use numbers in values not representing an actual number such as ID numbers, invoice numbers, purchase order numbers, account numbers etc., do NOT use consequtive digits like 1234 or 5432. ' + 
        'Only return the valid JSON, do not start the answer with three backticks and the word json. ';
    }
}

/**
 * Defensive JSON parsing with multiple fallback strategies
 */
function parseAIResponse(responseText) {
    if (!responseText || typeof responseText !== 'string') {
        console.warn('Invalid response text:', responseText);
        return { error: 'Invalid response', rawResponse: responseText };
    }

    let cleanedText = responseText.trim();
    
    // Strategy 1: Try direct parsing
    try {
        return JSON.parse(cleanedText);
    } catch (error) {
        console.warn('Direct JSON parse failed:', error.message);
    }

    // Strategy 2: Remove common AI formatting issues
    try {
        // Remove markdown code blocks
        cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
        // Remove leading/trailing text before/after JSON
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            cleanedText = jsonMatch[0];
        }
        return JSON.parse(cleanedText);
    } catch (error) {
        console.warn('Cleaned JSON parse failed:', error.message);
    }

    // Strategy 3: Fix common JSON issues
    try {
        // Fix single quotes to double quotes
        cleanedText = cleanedText.replace(/'/g, '"');
        // Fix unquoted property names
        cleanedText = cleanedText.replace(/(\w+):/g, '"$1":');
        // Fix trailing commas
        cleanedText = cleanedText.replace(/,(\s*[}\]])/g, '$1');
        return JSON.parse(cleanedText);
    } catch (error) {
        console.warn('Fixed JSON parse failed:', error.message);
    }

    // Strategy 4: Extract key-value pairs and build object
    try {
        const keyValuePairs = {};
        const lines = cleanedText.split('\n');
        
        for (const line of lines) {
            const match = line.match(/["']?([^"':\s]+)["']?\s*:\s*["']?([^"',\n}]+)["']?/);
            if (match) {
                const key = match[1].trim();
                let value = match[2].trim();
                
                // Try to parse as number
                if (!isNaN(value) && value !== '') {
                    value = parseFloat(value);
                }
                // Try to parse as boolean
                else if (value.toLowerCase() === 'true') {
                    value = true;
                }
                else if (value.toLowerCase() === 'false') {
                    value = false;
                }
                
                keyValuePairs[key] = value;
            }
        }
        
        if (Object.keys(keyValuePairs).length > 0) {
            console.log('Extracted key-value pairs:', keyValuePairs);
            return keyValuePairs;
        }
    } catch (error) {
        console.warn('Key-value extraction failed:', error.message);
    }

    // Strategy 5: Return error object with raw response
    console.error('All JSON parsing strategies failed for response:', responseText);
    return {
        error: 'Failed to parse JSON response',
        rawResponse: responseText,
        fallbackData: {
            message: 'AI response could not be parsed as valid JSON',
            timestamp: new Date().toISOString()
        }
    };
}

/**
 * Generate readable display of generated values for the results table
 */
function generateReadableValues(data) {
    if (!data || typeof data !== 'object') {
        return '<em>No data available</em>';
    }

    const flattened = flattenObject(data);
    const fields = [];
    
    // Show up to 5 key-value pairs, prioritizing important fields
    const importantFields = ['name', 'title', 'company', 'address', 'email', 'phone', 'date', 'amount', 'id'];
    const sortedEntries = Object.entries(flattened).sort((a, b) => {
        const aImportant = importantFields.some(field => a[0].toLowerCase().includes(field));
        const bImportant = importantFields.some(field => b[0].toLowerCase().includes(field));
        if (aImportant && !bImportant) return -1;
        if (!aImportant && bImportant) return 1;
        return 0;
    });
    
    sortedEntries.slice(0, 5).forEach(([key, value]) => {
        const displayValue = String(value).length > 30 ? 
            String(value).substring(0, 30) + '...' : 
            String(value);
        fields.push(`<strong>${key}:</strong> ${displayValue}`);
    });
    
    return fields.length > 0 ? fields.join('<br>') : '<em>No values generated</em>';
}
