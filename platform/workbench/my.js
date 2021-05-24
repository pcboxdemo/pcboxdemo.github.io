var table;
var curId = 0;
var selectedId = 0;
var çƒ;

var contentExplorer;
function setId(id) {
  selectedId = id;
}

$(document).ready(function() {

  $("#newuserform").on('submit',function(ev) {
    ev.preventDefault();
    $.ajax({
      url: '/sandpit',
      type: 'get',
      data: {
        "cmd": "createAppUser","app": $("#apps").val(),"user": $("#newusername").val(),"id":$("#newuseremail").val()
      },
      dataType: 'json',
      success:function(response) {
        console.log(response);
      },
      error: function(response) {

      }
    });
  });
  //For tabbed content panes - custom and UI element
  $('ul.tabs1 li').click(function() {
    var tab_id = $(this).attr('data-tab1');
    $('ul.tabs1 li').removeClass('current');
    $('.tab-content1').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  });
  $("#clear").click(function() {
    $("#tail").text("");
  });
  //Set variable for main datatable list
  $t = $("#contentlist");
  //Hide upload - only show when data is loaded
  $('#upload').hide();

  //Loads the available apps
  //loadApps();
  loadUsers();
  //Change handler for applications - loads users from app
  $("#apps").change(function() {
    console.log("change app:" + $("#apps").val());
    if ($("#apps").val() != 'dontchoose') {
      loadUsers();
    }
  });
  //Change handler for users - loads folder '0' for user, sets token for UI element and gets user info
  $("#users").change(function() {
    console.log("change users:" + $("#users").val());
    $('body').addClass('waiting');
    $("#tail").empty();
    if ($("#users").val() != 'dontchoose') {
      if (typeof table == 'undefined') {
        console.log("Creating new table for id 0");
        table = loadTable(0);
      } else {
        console.log("reloading table for id 0");
        reloadTable(0);
      }
      //loaded table - set token for UI element
      var userSelect = $("#users").val();
      var appSelect = $("#apps").val();
      setBreadCrumb(appSelect, userSelect);
      $.ajax({
        url: '/sandpit',
        type: 'get',
        data: {
          "cmd": "getToken",
          "app": appSelect,
          "user": userSelect
        },
        dataType: 'json',
        success: function(response) {
          var folderId = '0';
          console.log("token: " + response);
          if (contentExplorer) {
            //If already loaded, hide and clear cache
            contentExplorer.hide();
            contentExplorer.clearCache();
          }
          contentExplorer = new Box.ContentExplorer();
          contentExplorer.show(folderId, response, {
            container: '#tab-200',
            size: 'large',
            requestInterceptor:testRequestInterceptor,
             contentPreviewProps: {
				           contentSidebarProps: {
                      hasMetadata: true,
                      hasSkills: true,
                      hasProperties: true,
                      hasAccessStats: true,
                      hasActivityFeed: true,
                      defaultView:'activityFeed'
			                 },
                      contentOpenWithProps: {
					                   show: true
				              }
                    }
          });
        },
        error: function(response) {
          console.log("bad response from getToken:" + response);
        }
      });
      //Load user info
      $.ajax({
        url: '/sandpit',
        type: 'get',
        data: {
          "cmd": "getUserInfo",
          "app": appSelect,
          "user": userSelect
        },
        dataType: 'json',
        success: function(response) {
          $("#userinfo").html("");
          $.each(response, function(key, value) {
            $("#userinfo").append("[" + key + "=" + value + "]").append("<br/>");
          });
        },
        error: function(response) {
          console.log("bad response from getUserInfo:" + response);
        }
      });
      $('body').removeClass('waiting');
    }
  });
  //Handles double click
  $('#contentlist tbody').on('dblclick', 'tr', function() {
    processOpen(this);
  });
  //Handles file upload - submits form data with file content
  $("#upload-form").on('submit', (function(ev) {
    $("#upload-form").prop("disabled", true);
    ev.preventDefault();
    $.ajax({
      url: '/sandpit?app=' + $("#apps").val() + "&user=" + $("#users").val() + "&id=" + curId,
      type: 'POST',
      data: new FormData(this),
      contentType: false,
      cache: false,
      processData: false,
      success: function(data, status, xhr) {
        console.log("good upload - refresh table");
        $('#upload-form').trigger("reset");
        //Reload table to show uploaded document
        reloadTable(curId);
      },
      error: function(xhr, status, error) {
        console.log("bad upload:" + error);
      }
    });
  }));
  //Handles the closing of the shared data popup - properties, comments, collaborators etc.
  $('[data-popup-close]').on('click', function(e) {
    var targeted_popup_class = jQuery(this).attr('data-popup-close');
    $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
    processCommand("donothing", e);

  });
});
var testRequestInterceptor = (config /* https://github.com/axios/axios#response-config */) => {
    console.log(JSON.stringify(config));
    console.log(config.method);
     if(config.method=='get' || config.method=='post') {
       var response = "API(UI):" + config.method + "->" + config.url + (config.method=='get'?"?" + $.param(config.params):"")
        if(checkResponse(response)) {
        	console.log(response + "::" + decodeURI(response));
          $("<div />").text(decodeURI(response)).appendTo("#tail");
        }
      }

    return config;
};
function processCommand(cmd, e, type) {
  var userSelect = $("#users").val();
  var appSelect = $("#apps").val();
  var newComment = $("#newcomment").val();
  var folderName = $("#folders").val();
  var collaborator = $("#collaborators").val();
  var permission = $("#permissions").val();
  var cmd = cmd;
  var id = curId;
  console.log("info from fields: id=" + curId + " - newcomment=" + newComment + " - folderName=" + folderName + " - collaborator=" + collaborator + " - permission=" + permission);
  var data = "";
  if (newComment != '' && newComment != null) {
    data = newComment;
    cmd = "addComment";
    id = selectedId;
  } else if (folderName != '' && folderName != null) {
    data = folderName;
    cmd = "newFolder";
  } else if (collaborator != '' && collaborator != null) {
    data = collaborator + ":" + permission;
    cmd = "addCollaborator";
    type = $("#collaborators").attr("type");
    id = selectedId;
  } else if (cmd == 'addToFavourites') {
    id = selectedId;
  }
  console.log(cmd + ":" + data);
  if (cmd != 'donothing') {
    $.ajax({
      url: '/sandpit',
      type: 'get',
      data: {
        "cmd": cmd,
        "app": appSelect,
        "user": userSelect,
        "id": id,
        "data": data,
        "type": type
      },
      dataType: 'json',
      success: function(data, status, xhr) {
        console.log("good:" + cmd);
        if (data == 'refreshfolder') {
          reloadTable(curId);
        }
      },
      error: function(xhr, status, error) {
        console.log("bad cmd:" + cmd + ":" + error);
      }
    });
  }
  e.preventDefault();

}
//Process open button clicked
function processOpen(obj) {
  var rowData = table.row(obj).data();
  processOpenS(rowData['id'], rowData['type']);
}
//Process open either folder or file
function processOpenS(id, type) {
  var userSelect = $("#users").val();
  var appSelect = $("#apps").val();
  $.ajax({
    url: '/sandpit',
    type: 'get',
    data: {
      "cmd": "getDblClickAction",
      "app": appSelect,
      "user": userSelect,
      "id": id,
      "type": type
    },
    dataType: 'json',
    success: function(response) {
      console.log("getDblClickAction(): " + JSON.stringify(response));
      //If file - open new window with embed preview link
      if (type == 'file') {
        window.open(response.link);
      } else {
        //reload dt with new data
        console.log("loading table with :" + id);
        curId = id;
        reloadTable(id);
        setBreadCrumb(appSelect, userSelect);
      }
    }
  });
}
//Reload table by changing URL and calling reload
function reloadTable(id) {
  //Change URL and reload
  var newURL = "/sandpit?fromAjax=true&cmd=getFolder&user=" + $("#users").val() + "&app=" + $("#apps").val() + "&id=" + id;
  console.log("new URL:" + newURL);
  table.ajax.url(newURL);;
  table.ajax.reload();
}
//Load table and set columns, buttons and configurations
function loadTable(id) {
  console.log("loading table:" + id);
  $("#cloader").show();
  var userSelect = $("#users").val();
  var appSelect = $("#apps").val();
  console.log("Creating new table");
  var t = $('#contentlist').DataTable({
    "select": true,
    "dom": "Bfrtip",
    "pageLength": 5,
    "ajax": "/sandpit?fromAjax=true&cmd=getFolder&user=" + $("#users").val() + "&app=" + $("#apps").val() + "&id=" + curId,
    "columns": [{
        "data": null,
        render: function(data, type, row) {
          return "<img src='/platform/workbench/dt/" + row.type + ".png'>";
        }
      },
      {
        "data": "name"
      },
      {
        "data": "type"
      },
      {
        "data": "id"
      },
      {
        "data": "modified"
      },
      {
        "data": "owner"
      }
    ],
    buttons: [{
        text: "New Folder",
        action: function(e, dt, node, config) {
          var folders = $("<input type='text' />");
          folders.attr("id", "folders");
          $("#popup-span").html(folders);
          e.preventDefault();
          $('[data-popup="popup-1"]').fadeIn(350);
        }
      },
      {
        extend: "selectedSingle",
        text: "Comments",
        action: function(e, dt, node, config) {
          setId(t.row({
            selected: true
          }).data().id);
          showStuff(e, t.row({
            selected: true
          }).data().id, t.row({
            selected: true
          }).data().type, "getComments")
        }
      },
      {
        extend: "selectedSingle",
        text: "Delete",
        action: function(e, dt, node, config) {
          setId(t.row({
            selected: true
          }).data().id);
          showStuff(e, t.row({
            selected: true
          }).data().id, t.row({
            selected: true
          }).data().type, "doDelete")
        }
      },
      {
        extend: "selectedSingle",
        text: "Open",
        action: function(e, dt, node, config) {
          processOpenS(t.row({
            selected: true
          }).data().id, t.row({
            selected: true
          }).data().type)
        }
      },
      {
        extend: "selectedSingle",
        text: "Collaborations",
        action: function(e, dt, node, config) {
          setId(t.row({
            selected: true
          }).data().id);
          showStuff(e, t.row({
            selected: true
          }).data().id, t.row({
            selected: true
          }).data().type, "getPermissions");

        }
      }, {
        extend: "selectedSingle",
        text: "Add Collaborator",
        action: function(e, dt, node, config) {
          setId(t.row({
            selected: true
          }).data().id);
          var collaborators = $("<select />");
          collaborators.attr("id", "collaborators").attr("type", t.row({
            selected: true
          }).data().type);
          var permissions = $("<select />");
          permissions.attr("id", "permissions");
          $("#popup-span").html("");
          $("#popup-span").append(collaborators);
          $("#popup-span").append(permissions);
          loadCollaborators();
          e.preventDefault();
          $('[data-popup="popup-1"]').fadeIn(350);
        }
      },
      {
        extend: "selectedSingle",
        text: "Metadata",
        action: function(e, dt, node, config) {
          setId(t.row({
            selected: true
          }).data().id);
          showStuff(e, t.row({
            selected: true
          }).data().id, t.row({
            selected: true
          }).data().type, "getMetadata");
        }
      },
      {
        text: "Recents",
        action: function(e, dt, node, config) {
          showStuff(e, null, null, "getRecents");
        }
      },
      {
        text: "Favourites",
        action: function(e, dt, node, config) {
          showStuff(e, null, null, "getFavourites");
        }
      },
      {
        extend: "selectedSingle",
        text: "Add to Favourites",
        action: function(e, dt, node, config) {
          setId(t.row({
            selected: true
          }).data().id);
          processCommand("addToFavourites", e, t.row({
            selected: true
          }).data().type);
        }
      }
    ]
  });
  console.log("new table created");
  t.select.style("single");
  //Handler for search - use box search?
  t.on('search.dt', function() {
    console.log("search");
  });
  $('#upload').show();
  $("#cloader").hide();
  return t;
}
//Handler for showing data in central popup - eg. comments, collaborators or metadata
function showStuff(e, id, type, action) {
  loadTableData($("#popup-span"), id, type, action);
  e.preventDefault();

}
//Ugly handling of the tabbed metadata - fix tabs
function loadTableData(targetEl, id, type, cmd) {
  $("#cloader").show();
  var userSelect = $("#users").val();
  var appSelect = $("#apps").val();
  console.log("loading " + cmd);
  $.ajax({
    url: '/sandpit',
    type: 'get',
    data: {
      "cmd": cmd,
      "app": appSelect,
      "user": userSelect,
      "id": id,
      "type": type
    },
    dataType: 'json',
    success: function(response) {
      console.log("getData(): " + JSON.stringify(response));
      targetEl.html("");
      var props = "";
      var topTabs;
      if (cmd == 'getMetadata') {
        //this ugly bit of javascript creates nice tabbed metadata
        topTabs = $('<ul></ul>').addClass('tabs');
        var i = 1;
        var topTabsHTML = "";
        $.each(response, function(key, value) {
          var current = i == 0 ? ' current' : '';
          topTabsHTML += '<li class="tab-link' + current + '" data-tab="tab-' + i + '">' + key + '</li>';
          i++;
        });
        topTabs.html(topTabsHTML);
        i = 1;
        var contentTabs = "";
        $.each(response, function(key, value) {
          var current = i == 0 ? ' current' : '';
          contentTabs += '<div id="tab-' + i + '" class="tab-content' + current + '">';
          $.each(value, function(name, propvalue) {
            contentTabs += name + "=" + propvalue + "<br/>";
          });
          contentTabs += '</div>';
          i++;
        });
        console.log(topTabs);
        topTabs.appendTo(targetEl);
        targetEl.append(contentTabs);
        $('ul.tabs li').click(function() {
          console.log("clicked:" + $(this).attr('data-tab'));
          var tab_id = $(this).attr('data-tab');
          $('ul.tabs li').removeClass('current');
          $('.tab-content').removeClass('current');
          $(this).addClass('current');
          $("#" + tab_id).addClass('current');
        });
      } else {
        //Standard display - key value pairs - would table look better?
        $.each(response, function(key, value) {
          console.log("Key: " + key);
          props += key + "=" + value + "<br/>";
        });
        targetEl.html(props);
      };
      //if comments - show text box for adding comment
      if (cmd == 'getComments') {
        targetEl.append("<input type='text' label='new comment' id='newcomment'/>");
      }
      $('[data-popup="popup-1"]').fadeIn(350);
      $("#cloader").hide();
    },
    error: function(data) {
      $("#cloader").hide();

    }
  });
}
//Loads application names into select element
function loadApps() {
  var selected = '${app}';
  $.ajax({
    url: '/sandpit',
    type: 'get',
    data: {
      "cmd": "getApps"
    },
    dataType: 'json',
    success: function(response) {
      console.log("getApps(): " + JSON.stringify(response));
      //Clear existing drop downs
      $("#apps").empty();
      $("#users").empty();
      var len = response.length;
      $("#apps").append("<option value='dontchoose'>Select app</option>");
      $.each(response, function(key, value) {

        $("#apps").append("<option value='" + key + "'>" + value + "</option>");
      });
    }
  });
};
//Loads users into select element


//Loads collaborators and permissions into select elements for adding collaborators
function loadCollaborators() {
  var appSelect = $("#apps").val();
  console.log("loadCollaborators");
  $.ajax({
    url: '/sandpit',
    type: 'get',
    data: {
      "cmd": "getCollaborators",
      "app": appSelect
    },
    dataType: 'json',
    success: function(response) {
      console.log("getCollaborators(): " + JSON.stringify(response));
      $("#collaborators").empty();
      $("#collaborators").append('<option value=dontchoose>Select user</option>');
      $.each(response['users'], function(key, value) {
        $("#collaborators").append('<option value=' + key + ' >' + value + '</option>');
      });
      $.each(response['permissions'], function(key, value) {
        $("#permissions").append('<option value=' + key + ' >' + value + '</option>');
      });
    },
    error: function(xhr, status, error) {
      console.log("loadCollaborators error:" + error);
    }
  });
};


//This is for status window - check for new messages every 5 seconds
window.setInterval(function() {
  loadMessages();
}, 5000);
// tail effect
function tailScroll() {
  var height = $("#tail").get(0).scrollHeight;
  $("#tail").animate({
    scrollTop: height
  }, 500);
};
//Loads latest messages from status worker
function loadMessages() {
  $.ajax({
    url: '/status?app=' + $("#apps").val(),
    type: 'get',
    data: {},
    dataType: 'json',
    success: function(response) {
      if (response.length != 0) {
        console.log("getNewMessages(): " + response);
        for (i in response) {
          if (checkResponse(response[i])) {
            $("<div />").text(decodeURI(response[i])).appendTo("#tail");
          }
        };
      }
      tailScroll();
    }
  })
};
//Only show message if the corresponding checkbox is checked
function checkResponse(text) {
  var eventType = text.split(":")[0];
  if (eventType == 'SDK' && $("#sdk").is(":checked")) {
    return true;

  }
  if ((eventType == 'API' || eventType =='API(UI)' ) && $("#api").is(":checked")) {
    return true;
  }
  if (eventType == 'BOXEVENT' && $("#event").is(":checked")) {
    return true;
  }
}
//Sets breadcrumb for navigation
function setBreadCrumb(app, user) {
  console.log("setting setBreadCrumb:" + app + ":" + user);
  $.ajax({
    url: '/sandpit',
    type: 'get',
    data: {
      "cmd": "getFolderPath",
      "app": app,
      "user": user,
      "id": curId
    },
    dataType: 'json',
    success: function(response) {
      console.log("getFolderPath(): " + JSON.stringify(response));
      $("#bread").empty();
      $.each(response, function(key, value) {
        console.log(key + ":" + value);
        $("<span/>").attr("id", key).css('cursor', 'hand').html("/" + value) .on('click', function() {
          console.log(this.id)
          processOpenS(this.id, "folder");
        }).appendTo($("#bread"));
      });
    },
    error: function(xhr, status, error) {
      console.log("getFolders error:" + error);
    }
  });

}
