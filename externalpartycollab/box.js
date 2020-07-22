function getDocumentInfo(id, token, type) {
  $.ajax({
    method: 'get',
    url: "https://api.box.com/2.0/" + type + "/" + id + "?fields=id,name",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(response) {
      console.log(response);
      if (type == 'files') {
        $("#docInfo").html("Document:" + response.name);
        preview.show(id, token, {
            container: '#docView',
            header: 'dark',
            showDownload: true,
            contentSidebarProps: {
              hasMetadata: true,
              hasSkills: true,
              hasProperties: true,
              hasAccessStats: true,
              hasActivityFeed: true,
              defaultView: 'activityFeed'
            }
          });
        }
        else {
          $("#docInfo").html("Folder:" + response.name);
          explorer.show(id, token, {
              container: '#docView',
          });
        }
      },
    error: function(err) {
      console.log(JSON.stringify(err));
      console.log("error:" + err.message);
    }
  });
}

function getGroups(token) {
  $('#selectGroup')
    .empty()
    .append('<option selected="selected" disabled="" value="Select group">Select group</option>');
  $.ajax({
    method: 'get',
    url: "https://api.box.com/2.0/groups",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(response) {
      var i = 0;
      $.each(response.entries, function(k, data) {
        $('select option:contains("Select group")').text('Select group (' + i + ')');
        if (data.name.startsWith("EXT")) {
          $("#selectGroup").append("<option value='" + data.id + "'>" + data.name + "</option>");
          i++;
        }
      });

    },
    error: function(err) {
      console.log(JSON.stringify(err));
      console.log("error:" + err.message);

    }
  });
}

function getUsers(groupId, token) {
  $("#selectUser > option").each(function() {
    this.remove();
  });
  $("#selectUser").attr("data-placeholder", "Fetching users...");
  $.ajax({
    method: 'get',
    url: "https://api.box.com/2.0/groups/" + groupId + "/memberships",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(response) {
      var i = 0;
      //console.log(response);

      $.each(response.entries, function(k, data) {

        $("#selectUser").append("<option value='" + data.user.id + "'>" + data.user.name + "</option>");
        i++;
      });
      $("#selectUser").attr("data-placeholder", "Found " + i + " users..");
      $('#selectUser').trigger("chosen:updated");
    },
    error: function(err) {
      console.log(JSON.stringify(err));
      console.log("error:" + err.message);

    }
  });
}

function removeCollaboration(collabId, token) {
  $.ajax({
    method: 'delete',
    url: "https://api.box.com/2.0/collaborations/" + collabId,
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(response) {
      console.log("deleted");
      countDownCalls--;
      if (countDownCalls == 0) {
        console.log("countDownCalls:" + countDownCalls);
        getCollaborators(fileId, token);
      }
      $("#saveMsg").hide();
      $("#saveMsg").text("Removed collaboration");
      $("#saveMsg").show('slow');
      $("#saveMsg").hide('slow');
    },
    error: function(err) {
      console.log(JSON.stringify(err));
      console.log("error:" + err.message);

    }
  });
}

function getCollaborators(fileId, token) {
  $.ajax({
    method: 'get',
    url: "https://api.box.com/2.0/" + type + "/" + fileId + "/collaborations",
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(response) {
      var i = 1;
      console.log(JSON.stringify(response));
      $.each(response.entries, function(k, data) {
        if(data.accessible_by.type=='user' && data.accessible_by.login.startsWith("AppUser")) {
          $(".collaborators").append("<li collabId='" + data.id + "' id=" + data.accessible_by.id + " class='list-group-item d-flex justify-content-between align-items-center'>" + data.accessible_by.name + "<span id='" + data.accessible_by.id + "_p' class='badge badge-default badge-pill'>" + data.role + "</span><span  class='badge badge-default badge-pill remove'>x</span></li>");
        }
      });
      $(".remove").click(function(event) {
        console.log("remove clicked");
        $(this).parent('li').removeClass('d-flex').hide('slow');
        $("#saveAll").show();
      });
        $("#saveAll").hide();
        //preview.hide();
        //preview.refresh();
    },
    error: function(err) {
      console.log(JSON.stringify(err));
      console.log("error:" + err.message);

    }
  });
}

function addCollaboration(element, fileid, id, role, token) {

  var data = "{\"item\": {";
  data = data + "\"id\":\"" + fileId + "\",";
  data = data + "\"type\":\"" + typeS + "\"},";
  data = data + "\"accessible_by\":{\"id\":\"" + id + "\",\"type\":\"user\"},";
  data = data + "\"role\":\"" + role + "\"";
  data = data + "}";
  $.ajax({
    method: 'post',
    url: "https://api.box.com/2.0/collaborations?notify=false",
    data: data,
    headers: {
      "Authorization": "Bearer " + token
    },
    success: function(response) {
      countDownCalls--;
      console.log("countDownCalls:" + countDownCalls);
      if (countDownCalls == 0) {
        getCollaborators(fileId, token);
      }
      var name;
      $("#selectUser > option").each(function() {
        if (this.value == id) {
          name = this.text;
        }
      });
      $("#saveMsg").hide();
      $("#saveMsg").text("Added collaboration for " + name + " with permission " + role);
      $("#saveMsg").fadeIn(3000);
      $("#saveMsg").hide('slow');
    },
    error: function(err) {
      console.log(JSON.stringify(err));
      console.log("error:" + err.message);

    }
  });


}
