

function createCEOptions() {
    let options =contentExplorerOptions;
    contentExplorerOptions['container'] = '.ucontainer';
    contentExplorerOptions['requestInterceptor'] = myRequestInterceptor;
    contentExplorerOptions['responseInterceptor'] = myResponseInterceptor;
    contentExplorerOptions['container'] = '.ucontainer';
    contentExplorerOptions['size'] = 'large';
    contentExplorerOptions["boxAnnotations"] = annotations;
    contentExplorerOptions['contentPreviewProps']["boxAnnotations"] = annotations;

    return options
}
let contentExplorerOptions = {
    "canDownload": true,
    "canPreview": true,
    "canDelete": false,
    "canUpload": true,
    "canShare": true,
    "canRename": false,
    "canSetShareAccess": false,
    "contentPreviewProps": {
        
      "showAnnotations": true,
        "enableAnnotationsDiscoverability": true,
	    "enableAnnotationsImageDiscoverability": true,
		"showAnnotationsControls": true,
        "showAnnotationsDrawingCreate": true,
        "contentAnswersProps": {
            "show": true,
        },
      "contentSidebarProps": {
        "detailsSidebarProps": {
          "hasProperties": true,
          "hasNotices": true,
          "hasAccessStats": true,
          "hasClassification": true
        },
        "hasActivityFeed": true,
        "hasMetadata": true,
        "hasSkills": true,
        "hasVersions": true,
        "features": {
            "activityFeed": {
              "annotations": {
                "enabled": true
              }
            }
          }
      },
      
    }
  }
  function extractBoxResourceOld(url) {
    let match = url.match(/https:\/\/api\.box\.com\/2\.0\/([^\/]+)/);
    return match ? match[1] : null;
}
function extractBoxResource(url) {
    let match = url.match(/https:\/\/api\.box\.com\/2\.0\/([^\/]+)(?:\/(\d+))?(?:\/([^\/?]+))?/);
    
    if (!match) return null;

    let firstElement = match[1]; // Always the first element
    let secondElement = match[3] || (match[2] ? null : match[1]); // Get the next non-number, avoid repeating firstElement

    return secondElement && secondElement !== firstElement ? `${firstElement} ${secondElement}` : firstElement;
}
function getRandomNumber() {
    return Math.floor(Math.random() * 10000) + 1;
}

let level=1;
function generateFormFields(obj, prefix = '') {
    
    let formFields = '';
    for (const key in obj) {
        if(key!=='boxAnnotations') {
            if (typeof obj[key] === 'object') {
                level++;
                formFields += `<div class="p-2"><span class="ms-${level}">${key}</span>${generateFormFields(obj[key], prefix + key + '.',level)}</div>`;
            } else if (typeof obj[key] === 'boolean') {
                
                formFields += `
                    <div class="form-group form-check d-flex align-items-center">
                        <input type="checkbox" class="form-check-input ms-${level} p-1" id="${prefix + key}" ${obj[key] ? 'checked' : ''}>
                        <label class="form-check-label ms-${level} p-1" for="${prefix + key}">${key}</label>
                    </div>
                `;
                
            }
        }
    }
    return formFields;
}
function getFormData(form) {
    const formData = {};
    form.find('input[type="checkbox"]').each(function() {
        const keys = $(this).attr('id').split('.');
        let obj = formData;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!obj[keys[i]]) obj[keys[i]] = {};
            obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = $(this).is(':checked');
    });
    return formData;
}


function addListener () {
    explorer.addListener('navigate',(folder)=> {
    console.log('navigate to ' + folder.id);
    currentId=folder.id;

  });
}