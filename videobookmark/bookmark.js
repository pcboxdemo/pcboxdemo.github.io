if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  };
  var cardBootstrapCreate = "" + 
"        {\"cards\":[{" + 
"            \"created_at\": \"{2}\"," + 
"            \"type\": \"skill_card\"," + 
"            \"skill\": {" + 
"                \"type\": \"service\"," + 
"                \"id\": \"1791\"" + 
"            }," + 
"            \"skill_card_type\": \"transcript\"," + 
"            \"skill_card_title\": {" + 
"                \"code\": \"skills_bookmarks\"," + 
"                \"message\": \"Bookmarks\"" + 
"            }," + 
"            \"invocation\": {" + 
"                \"type\": \"skill_invocation\"," + 
"                \"id\": \"06db0aa7-1476-4afc-888e-ebcb1878d196_1481828816\"" + 
"            }," + 
"            \"status\": {}," + 
"            \"entries\": {0},"+
"			\"duration\":{1} " + 
"        }]}" + 
"";
var cardBootstrapUpdate = "" + 
"           {" + 
"            \"created_at\": \"{2}\"," + 
"            \"type\": \"skill_card\"," + 
"            \"skill\": {" + 
"                \"type\": \"service\"," + 
"                \"id\": \"1791\"" + 
"            }," + 
"            \"skill_card_type\": \"transcript\"," + 
"            \"skill_card_title\": {" + 
"                \"code\": \"skills_bookmarks\"," + 
"                \"message\": \"Bookmarks\"" + 
"            }," + 
"            \"invocation\": {" + 
"                \"type\": \"skill_invocation\"," + 
"                \"id\": \"06db0aa7-1476-4afc-888e-ebcb1878d196_1481828816\"" + 
"            }," + 
"            \"status\": {}," + 
"            \"entries\": {0},"+
"			\"duration\":{1} " + 
"        }" + 
"";
function transformData(data,duration,timeStamp,hasMetadata) {
    if(hasMetadata) {
        //body needs to be op
        var card = cardBootstrapUpdate.format(JSON.stringify(data),duration,timeStamp);

        return '[{"op":"replace","path":"/cards/0","value":' + card+'}]';
    }
    else {
        return cardBootstrapCreate.format(JSON.stringify(data),duration,timeStamp);
        
    }
}

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = Math.trunc(~~duration % 60);
  
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
  
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  
    return ret;
  }
  function toSeconds(str) {
    var pieces = str.split(":");
    var result = Number(pieces[0]) * 60 + Number(pieces[1]);
    return (result.toFixed(0));
  }
  //Load existing bookmarks
 function loadBookmarks() {
  //Call the Box metadata API to fetch the existing metadata
    $.ajax({
      method: 'get',
      url: "https://api.box.com/2.0/files/" + boxFileId + "/metadata/global/boxSkillsCards",
      crossDomain: true,
      async: false,
      headers: {
        "Authorization": "Bearer " + boxAccessToken},
      cache: false,
      success: function (response) {
        //Set the hasMetadata flag as the create and update calls are different
        hasMetadata=true;
        //Add the bookmarks to the page
        $.each(response.cards[0].entries, function (k, data) {
          //Each bookmark is added to an HTML list with some bootstrap styling
          $(".bookmarks").append(
            "<li uid=" + i + " id=v_" + i + 
            " class='list-group-item d-flex justify-content-between align-items-center ital'" +  
            " bk='" + data.text + "'><span style='width:100px'>" + data.text + "</span>" + 
            "<span id='start_" + i + "' class='badge badge-primary badge-pill'>" 
            + fancyTimeFormat(data.appears[0].start) + "</span>" + 
            "<span id='end_" + i + "' class='badge badge-warning badge-pill'>" 
            + fancyTimeFormat(data.appears[0].end) + "</span>" + 
            " <span  class='badge badge-primary badge-pill remove'>x</span></li>")
          i++;
        });
        //Add remove handler for the bookmark control
        $(".remove").click(function (event) {
          //Remove bookmark
          $(this).parent('li').removeClass('d-flex').hide('slow');
          //Show save button as a change was made
          $("#saveAll").show();
        });
      }

    });
  }
    function saveBookmarks(data,duration,hasBookmarks) {
      //Use put if bookmarks already exists, POST to create
      var method = hasBookmarks?"PUT":"POST";
      $.ajax({
        "async": false,
        "crossDomain": true,
        "dataType": "json",
        "url":"https://api.box.com/2.0/files/"+boxFileId + "/metadata/global/boxSkillsCards",
        //The input for create and update metadata are different so a transform method is used to format curretly based on 
        //whether it is an update or a create
        "data": transformData(data,duration,new Date().toISOString(),hasBookmarks), 
        "method": method,
        "headers": {
          "Authorization":"Bearer " + boxAccessToken,
          //The content type is different for update and create 
          "Content-Type":hasBookmarks?"application/json-patch+json":"application/json"
        },
        success: function (response) {
          //Reset the bookmark adding controls 
          //and enables regular control buttons after the save
         resetControls();
        }
  
      });
    }
  function resetControls() {
    $("#bookmarkstarttime").val("0.00");
    $("#bookmarkendtime").val("0.00");
    inPause = false;
    $("#bookmarkname").val("");
    $("#spinner").attr("src", "tick.png");
    $("#spinner").fadeOut(1500, function (ev) {
      $("#save-bookmark").show();
    });
    var el = document.querySelector('.badge-success');
    el.classList.remove('badge-success');
    el.classList.add('badge-primary');
  }