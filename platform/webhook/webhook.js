var token;
var id;
var userId;
var webhookId;
var contentExplorerA;
var folderPicker;
var webhookId;
$(document).ready(function () {

      $(".resetBtb").click(function(e) {
        //Delete webhook?
        deleteWebhook(reload);

    });
    var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
    	$("#errorMessage").hide();
        e.preventDefault();
        console.log("I want from nav:" + $(this).attr('id'));
        if($(this).attr('id')=='folderClicked') {
        	$(".nextBtn").hide();
        }
        else {
        	$(".nextBtn").show();
        }
        if($(this).attr('id')=='tryClicked' && !$(this).hasClass('disabled')) {
            $("eloader").show();
            createWebhookAndLoadExplorer();

            //listen for events
            window.setInterval(function() {
              listenForEvents();
            }, 3000);
        }


        var $target = $($(this).attr('href')),$item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-success').addClass('btn-default');
            $item.addClass('btn-success');
            allWells.hide();
            $target.show();

        }
    });

    allNextBtn.click(function () {
      console.log("I want from next:" + $(this).closest(".setup-content").attr("id"));
      $("#errorMessage").hide();
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
            if (!curInputs[i].validity.valid) {
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid) nextStepWizard.removeAttr('disabled').trigger('click');
    });




      loadUsers();
      $("#users").change(function() {
        console.log("change users:" + $("#users").val());
        if ($("#users").val() != 'dontchoose') {
          if(folderPicker) {
            folderPicker.hide();
            folderPicker.clearCache();
          }
          var userSelect = $("#users").val();
          var appSelect = $("#apps").val();
          $.ajax({
            url: '/sandpit',
            type: 'get',
            data: {
              "cmd": "getToken","app": appSelect,"user": userSelect
            },
            dataType: 'json',
            success: function(response) {
              token=response;
              folderPicker = new Box.FolderPicker();
                folderPicker.show('0', token, {
                    container: '.folderChooser',
                    maxSelectable: 1,
                    contentPreviewProps: {
                        contentSidebarProps: {
                          hasMetadata: false,
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
                folderPicker.addListener('choose', function(response) {
                  $.each(response, function(k, data) {
                      console.log(JSON.stringify(data));
                      id = data.id;

                  });
                  $('.eventsselect').trigger('click');
                });
            },
            error: function(response) {
              console.log("bad response from getToken:" + response);
            }
          });

        }
      });
});
function createWebhookAndLoadExplorer() {
  var data = "{\"target\":{\"id\":\"" + id + "\",\"type\":\"folder\"},\"address\":\"https://box-java-sandpit.herokuapp.com/webhooklistener\"," +
  "\"triggers\":" + getEvents() + "}";
  console.log(data);
  $.ajax({
    url: 'https://api.box.com/2.0/webhooks',
    headers: {"Authorization": "Bearer "+token,"Content-Type": "application/json"},
    type: 'POST',
    data:data
    ,
    success: function(data,status,xhr) {
      console.log("webhook created:" + JSON.stringify(data) + " (" + status + ")");
      webhookId = data.id;
      //create webhook
        contentExplorerA = new Box.ContentExplorer();
        contentExplorerA.show(id,token,{
            container: '.explorer-a',
            logoUrl:'box',
            contentPreviewProps: {
              contentSidebarProps: {
                hasMetadata: true,
                hasSkills: true,
                hasProperties: true,
                hasAccessStats: true,
                defaultView:'metadata'
              }
            }
          });
          $("eloader").hide();
        },
        error: function(xhr,status,data) {
          console.log("Webhook creation error:" + xhr.responseText + ":" + JSON.parse(xhr.responseText) + ":" + status);
          $("#errorMessage").text("An error occurred creating the webhook '" + xhr.responseText + "'. Please fix this and try again from step 1").show();
        }
  });
}
var keepListening=true;
var c = 0;
function listenForEvents() {
  if(keepListening) {
      $.ajax({
        url: 'https://box-java-sandpit.herokuapp.com/webhooklistener?webhookId='+webhookId,
        crossDomain:true,
        type: 'get',
        data: { },
        dataType: 'json',
        success: function(data) {
          console.log("Payload:" + JSON.parse(data).payload);
          console.log("Message:" + JSON.parse(data).message);
            if(JSON.parse(data).payload!=null) {
              $("#wloader").hide();
              $("#webhookPayload").html(JSON.stringify(JSON.parse(JSON.parse(data).payload),null,2));
              //keepListening=false;
              c++;
              $("#webhookC").text("Webhook (" + c + ")")
            }
            else {
              //how loader
              $("#wloader").show();
            }
          }
      });
    }

}
function getEvents() {
  var eventsNice="";
  var events="[";
  var delim="";
  $. each($("input[type='checkbox']:checked"), function(){
      if($(this).attr("id")) {
        events+=delim+"\"" + $(this).attr("id").toUpperCase() + "\"";
        eventsNice+=delim + $(this).next().text() ;
        delim=", ";
      }
  });
  events+="]";
  $("#events").text(eventsNice);
  return events;
}
function reload() {
    location.reload(true);
}
function deleteWebhook(callback) {
  $.ajax({
    url: 'https://api.box.com/2.0/webhooks/' + webhookId,
    headers: {"Authorization": "Bearer "+token},
    type: 'delete',
    data:{},
    success: function(data) {
      console.log("deleted");
      callback(callback);
    },
    error: function(data) {
      console.log("delete webhook failed:" + JSON.stringify(data));
      callback(callback);
    }
  });

}
