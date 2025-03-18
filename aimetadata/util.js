async function createApprovalTask(fileId, userId) {
    $.ajax({
        url: "https://api.box.com/2.0/tasks",
        type: "POST",
        headers: {
            "Authorization": "Bearer " + boxToken,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "message":"Please review and categorize this document",
            "item": {
                "type": "file",
                "id": fileId
            },
            "action": "review", // Approval task type
            //"due_at": "2025-03-15T12:00:00Z", // Optional due date in ISO 8601 format
            
        }),
        success: async function(response) {
            console.log("Approval Task Created:", response);
            await assignTask(response.id, userId);
            return 'ok';
        },
        error: function(xhr, status, error) {
            console.error("Error creating task:", xhr.responseText);
        }
    });
}
async function assignTask(taskId, userId) {
    $.ajax({
        url: "https://api.box.com/2.0/task_assignments",
        type: "POST",
        headers: {
            "Authorization": "Bearer " + boxToken,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "task": {
                "type": "task",
                "id": taskId
            },
            "assign_to": {
                "id": userId // Box User Email or ID

            }
        }),
        success: function(response) {
            console.log("Task Assigned:", response);
        },
        error: function(xhr, status, error) {
            console.error("Error assigning task:", xhr.responseText);
        }
    });
}


// Function to delete the existing file and re-upload
function deleteAndReupload(sourceFileId, existingFileId, folderId) {
    $.ajax({
        url: `https://api.box.com/2.0/files/${existingFileId}`,
        headers: { Authorization: `Bearer ${boxToken}` },
        method: "DELETE",
        success: function () {
            console.log(`Deleted existing file ID: ${existingFileId}, now re-uploading.`);
            reuploadFile(sourceFileId, folderId);
        },
        error: function (err) {
            console.error("Error deleting file:", err);
        }
    });
}

function sanitizeMetadata(metadata) {
    // Remove fileName field
    delete metadata.fileName;

    // Helper function to check if a value is a valid number
    function isValidNumber(value) {
        return value !== null && value !== undefined && value !== "" && !isNaN(Number(value));
    }

    // Remove keys where the value is null
    for (let key in metadata) {
        if (metadata[key] === null) {
            delete metadata[key];
        }
    }

    // Rename 'category' key to 'categorydropdown' if it exists
   // if (metadata.hasOwnProperty('category')) {
    //    metadata.categorydropdown = metadata.category;
    //    delete metadata.category;
   // }

    // Convert and retain only valid numbers
    if (isValidNumber(metadata.month)) {
        metadata.month = Number(metadata.month);
    } else {
        delete metadata.month;
    }

    if (isValidNumber(metadata.year)) {
        metadata.year = Number(metadata.year);
    } else {
        delete metadata.year;
    }

    if (isValidNumber(metadata.confidence)) {
        metadata.confidence = Number(metadata.confidence);
    } else {
        delete metadata.confidence;
    }

    return metadata;
}

    function applyMetadata(fileId, metadata) {
        $.ajax({
            url: `https://api.box.com/2.0/files/${fileId}/metadata/enterprise_47757585/${metadataTemplateKey}`, // Replace 'template_name' with your actual template name
            type: "POST",
            headers: {
                "Authorization": "Bearer " + boxToken,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(sanitizeMetadata(metadata)),
            success: function(response) {
                console.log("Metadata applied successfully:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error applying metadata:", xhr.responseText);
            }
        });
    }

// Function to upload the file after deletion
function reuploadFile(fileId, folderId) {
    let data = { parent: { id: folderId } };

    $.ajax({
        url: `https://api.box.com/2.0/files/${fileId}/copy`,
        headers: { Authorization: `Bearer ${boxToken}`, "Content-Type": "application/json" },
        method: "POST",
        data: JSON.stringify(data),
        success: function () {
            console.log(`Reuploaded file ${fileId} to folder ${folderId}`);
        },
        error: function (err) {
            console.error("Error re-uploading file:", err);
        }
    });
}


function parseJsonFromString(input) {
    // Extract the JSON string between the backticks
    const jsonString = input.replace(/```json\n|\n```/g, '').trim();
    try {
        // Parse the cleaned JSON string
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON:", e);
        return null;
    }
}

async function copyFolder(sourceFolderId, targetFolderId) {
    console.log("Copying folder", sourceFolderId, "to", targetFolderId);
    $("#loader").show();
    $(".actions").hide();
    $.ajax({
        url: `https://api.box.com/2.0/folders/${sourceFolderId}/copy`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${boxToken}`,
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            parent: { id: targetFolderId }
        }),
        success: function (response) {
            console.log("Folder copied successfully:", response.id);
             rootTargetFolder = response.id;
             fetchCsvAndParse();
             $("#loader").hide();
             $(".actions").show();
             return rootTargetFolder;
            
        },
        error: function (err) {
            console.error("Error copying folder:", JSON.parse(err.responseText).context_info.conflicts.id);
            rootTargetFolder =  JSON.parse(err.responseText).context_info.conflicts.id;;
            fetchCsvAndParse();
            $("#loader").hide();
            $(".actions").show();
            return rootTargetFolder;
   
        }
    });           
   
}
function traverseFolders(parentFolderId, currentPath) {
    $.ajax({
        url: `https://api.box.com/2.0/folders/${parentFolderId}/items`,
        headers: { Authorization: `Bearer ${boxToken}` },
        method: "GET",
        success: function(response) {
            response.entries.forEach(item => {
                if (item.type === "folder") {
                    let newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
                    // Check if this path matches any category path
                    Object.entries(categoryToFolderPath).forEach(([category, path]) => {

                        if (newPath === path) {
                            categoryToFolderId[category] = item.id;
                        }
                    });
                    
                    // Continue traversing subfolders
                    traverseFolders(item.id, newPath);
                }
            });
        }
    });
}
