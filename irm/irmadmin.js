$(document).ready(async function () {
  // --- Auth and param logic (copied from index_seclore.html) ---
  var params = new URLSearchParams(window.location.search);
  var auth = params.get('code');
  var folderId = params.get('id');
  var clientId = params.get('clientId');
  var devToken = params.get('devToken');
  var debug = params.get('debug');
  var apiBaseUrl = (debug === 'true') ? 'http://localhost:8080' : 'https://box-seclore-poc-344c6efce56e.herokuapp.com';

  if (!auth || !folderId || !clientId) {
    $("#status").text("Error: Missing required parameters (auth, id, or clientId)");
    return;
  }

  // Get Box token (copied logic)
  try {
    await $.ajax({
      method: 'get',
      url: devToken==null?"https://dik4ogwqph.execute-api.eu-west-2.amazonaws.com/default/box-node-token-generator":"https://box-tokengenerator-v2.herokuapp.com/ping",
      data: { authCode: auth, id: folderId, clientId: clientId },
      crossDomain: true,
      cache: false,
      beforeSend: function () { $('#loader').show(); $(".container").hide(); },
      complete: function () { $('#loader').hide(); $(".container").show(); },
      success: function (response) {
        window.token = response.token || devToken;
      },
      error: function(xhr, status, error) {
        window.token = devToken;
      }
    });
    if (!window.token) throw new Error('No token available after authentication attempt');
  } catch (error) {
    $("#status").text("Error: " + (error.responseJSON?.message || error.statusText || "Unknown error"));
    return;
  }

  // --- Get folder name ---
  let folderName = "Unknown Folder";
  try {
    const response = await $.ajax({
      url: `https://api.box.com/2.0/folders/${folderId}`,
      headers: { "Authorization": "Bearer " + window.token }
    });
    folderName = response.name;
  } catch (e) {}
  $("#folderName").text(folderName);

  // --- Check IRM status ---
  let irmEnabled = false;
  async function checkIRMStatus() {
    try {
      const meta = await $.ajax({
        url: `https://api.box.com/2.0/folders/${folderId}/metadata/enterprise/securityClassification-6VMVochwUWo`,
        headers: { "Authorization": "Bearer " + window.token }
      });
      irmEnabled = (meta.Box__Security__Classification__Key === "Protected VDR");
    } catch (e) {
      irmEnabled = false;
    }
    updateIRMButton();
  }

  function updateIRMButton() {
    $("#irmToggleBtn")
      .text(irmEnabled ? `Disable IRM for ${folderName}` : `Enable IRM for ${folderName}`)
      .toggleClass('btn-danger', irmEnabled)
      .toggleClass('btn-success', !irmEnabled);
  }

  // --- Progress UI helpers ---
  const steps = [
    "Update external collaborators",
    "Set security classification metadata",
    "Set metadata cascade policy",
    "Force metadata cascade",
    "Set folder description"
  ];
  function renderProgress(statusArr) {
    $("#irmProgressList").empty();
    steps.forEach((step, i) => {
      let icon;
      if (statusArr[i] === "inprogress") {
        icon = '<span class="spinner-border spinner-border-sm step-icon step-inprogress"></span>';
      } else if (statusArr[i] === "complete") {
        icon = `<span class="step-circle step-complete-circle">${i+1}</span>`;
      } else {
        icon = `<span class="step-circle step-pending-circle">${i+1}</span>`;
      }
      $("#irmProgressList").append(`<li class="list-group-item d-flex align-items-center">${icon}${step}</li>`);
    });
  }

  // --- Enable/Disable IRM workflow ---
  async function irmWorkflow(enable) {
    let statusArr = Array(steps.length).fill("pending");
    renderProgress(statusArr);
    $("#status").text("");
    $("#irmToggleBtn").prop("disabled", true);

    // 1. Update collaborators
    statusArr[0] = "inprogress"; renderProgress(statusArr);
    try {
      const collabs = await $.ajax({
        url: `https://api.box.com/2.0/folders/${folderId}/collaborations`,
        headers: { "Authorization": "Bearer " + window.token }
      });
      for (const c of collabs.entries) {
        // Ignore owner, co-owner, editor
        if (
          c.accessible_by &&
          c.accessible_by.type === "user" &&
          !["owner", "co-owner", "editor"].includes(c.role.toLowerCase())
        ) {
          // OPTION 1: Check email domain for external users
           UNCOMMENT AND MODIFY DOMAIN AS NEEDED
          const INTERNAL_DOMAIN = "boxdemo.com";
          const email = c.accessible_by.login || "";
          const isExternal = !email.toLowerCase().endsWith("@" + INTERNAL_DOMAIN);
          

          // OPTION 2: Check if the current role indicates an external user (current approach)
          //const currentRole = c.role.toLowerCase();
          //const isExternal = enable ? 
          //  currentRole === "viewer uploader" :  // When enabling, treat viewer uploaders as external
         //   currentRole === "previewer uploader"; // When disabling, treat previewer uploaders as external
            
          if (isExternal) {
            await $.ajax({
              url: `https://api.box.com/2.0/collaborations/${c.id}`,
              method: "PUT",
              headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json" },
              data: JSON.stringify({ role: enable ? "previewer uploader" : "viewer uploader" })
            });
          }
        }
      }
      statusArr[0] = "complete"; renderProgress(statusArr);
    } catch (e) { statusArr[0] = "error"; renderProgress(statusArr); $("#status").text("Error updating collaborators"); return; }

    // 2. Set/update metadata
    statusArr[1] = "inprogress"; renderProgress(statusArr);
    try {
      if (enable) {
        // Try to create the metadata instance (POST). If it already exists (409), fallback to PUT/patch.
        try {
          await $.ajax({
            url: `https://api.box.com/2.0/folders/${folderId}/metadata/enterprise/securityClassification-6VMVochwUWo`,
            method: "POST",
            headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json" },
            data: JSON.stringify({
              Box__Security__Classification__Key: "Protected VDR"
            })
          });
        } catch (err) {
          if (err.status === 409) {
            // Already exists, so update with PUT/patch
            await $.ajax({
              url: `https://api.box.com/2.0/folders/${folderId}/metadata/enterprise/securityClassification-6VMVochwUWo`,
              method: "PUT",
              headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json-patch+json" },
              data: JSON.stringify([
                {
                  op: "add",
                  path: "/Box__Security__Classification__Key",
                  value: "Protected VDR"
                }
              ])
            });
          } else {
            throw err;
          }
        }
      } else {
        await $.ajax({
          url: `https://api.box.com/2.0/folders/${folderId}/metadata/enterprise/securityClassification-6VMVochwUWo`,
          method: "PUT",
          headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json-patch+json" },
          data: JSON.stringify([
            {
              op: "remove",
              path: "/Box__Security__Classification__Key"
            }
          ])
        });
      }
      statusArr[1] = "complete"; renderProgress(statusArr);
    } catch (e) { statusArr[1] = "error"; renderProgress(statusArr); $("#status").text("Error setting metadata"); return; }

    // 3. Set cascade policy
    statusArr[2] = "inprogress"; renderProgress(statusArr);
    let cascadePolicyId = null;
    try {
      if (enable) {
        try {
          // Try to create new cascade policy
          const resp = await $.ajax({
            url: `https://api.box.com/2.0/metadata_cascade_policies`,
            method: "POST",
            headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json" },
            data: JSON.stringify({
              folder_id: folderId,
              scope: "enterprise",
              templateKey: "securityClassification-6VMVochwUWo"
            })
          });
          cascadePolicyId = resp.id;
        } catch (err) {
          if (err.status === 409) {
            // If policy already exists, find it
            const resp = await $.ajax({
              url: `https://api.box.com/2.0/metadata_cascade_policies?folder_id=${folderId}`,
              headers: { "Authorization": "Bearer " + window.token }
            });
            for (const p of resp.entries) {
              if (p.templateKey === "securityClassification-6VMVochwUWo") {
                cascadePolicyId = p.id;
                break;
              }
            }
            if (!cascadePolicyId) {
              throw new Error("Could not find existing cascade policy");
            }
          } else {
            throw err;
          }
        }
      } else {
        // Find and delete existing cascade policy
        // This is not needed as t he cascade policy is deleted when the metadata instance is deleted
        /*const resp = await $.ajax({
          url: `https://api.box.com/2.0/metadata_cascade_policies?folder_id=${folderId}`,
          headers: { "Authorization": "Bearer " + window.token }
        });
        for (const p of resp.entries) {
          if (p.templateKey === "securityClassification-6VMVochwUWo") {
            await $.ajax({
              url: `https://api.box.com/2.0/metadata_cascade_policies/${p.id}`,
              method: "DELETE",
              headers: { "Authorization": "Bearer " + window.token }
            });
          }
        }*/
      }
      statusArr[2] = "complete"; renderProgress(statusArr);
    } catch (e) { statusArr[2] = "error"; renderProgress(statusArr); $("#status").text("Error setting cascade policy"); return; }

    // 4. Force cascade
    statusArr[3] = "inprogress"; renderProgress(statusArr);
    
    try {
      // Find and force-apply the cascade policy for the security template
      const resp = await $.ajax({
        url: `https://api.box.com/2.0/metadata_cascade_policies?folder_id=${folderId}`,
        headers: { "Authorization": "Bearer " + window.token }
      });
      for (const p of resp.entries) {
        console.log(p);
        if (p.templateKey === "securityClassification-6VMVochwUWo") {
          await $.ajax({
            url: `https://api.box.com/2.0/metadata_cascade_policies/${p.id}/apply`,
            method: "POST",
            headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json" },
            data: JSON.stringify({ conflict_resolution: "overwrite" })
          });
        }
      }
      statusArr[3] = "complete"; renderProgress(statusArr);
    } catch (e) { statusArr[3] = "error"; renderProgress(statusArr); $("#status").text("Error forcing cascade"); return; }

    // 5. Set folder description
    statusArr[4] = "inprogress"; renderProgress(statusArr);
    try {
      await $.ajax({
        url: `https://api.box.com/2.0/folders/${folderId}`,
        method: "PUT",
        headers: { "Authorization": "Bearer " + window.token, "Content-Type": "application/json" },
        data: JSON.stringify({
          description: enable
            ? "Secure VDR. To download files, goto the (...), Integrations->Protected download. If the option is not available, add here https://app.box.com/integrations/irm/i/4etW52HBcb"
            : "Standard VDR room"
        })
      });
      statusArr[4] = "complete"; renderProgress(statusArr);
      if (!enable) {
        // Remove the entire metadata instance as the last step on disable
        await $.ajax({
          url: `https://api.box.com/2.0/folders/${folderId}/metadata/enterprise/securityClassification-6VMVochwUWo`,
          method: "DELETE",
          headers: { "Authorization": "Bearer " + window.token }
        });
      }
      $("#status").text(enable ? "IRM enabled successfully!" : "IRM disabled successfully!");
      irmEnabled = enable;
      updateIRMButton();
    } catch (e) { statusArr[4] = "error"; renderProgress(statusArr); $("#status").text("Error setting folder description"); return; }

    $("#irmToggleBtn").prop("disabled", false);
  }

  // --- Button handler ---
  $("#irmToggleBtn").click(function () {
    irmWorkflow(!irmEnabled);
  });

  // --- Initial load ---
  await checkIRMStatus();
}); 