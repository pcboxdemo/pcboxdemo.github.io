var token;
var id;
var selectedType;
var userId;
var contentExplorerB;
var contentExplorerA;
$(document).ready(function () {
	
	
	
  
     var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
    	if($(this).attr('id')=='folderClicked') {
        	$(".nextBtn").hide();
        }
        else {
        	$(".nextBtn").show();
        }
        e.preventDefault();
        $(".loader").show();
        console.log("I want from nav:" + $(this).attr('id'));
        if($(this).attr('id')=='tryClicked' && !$(this).hasClass('disabled')) {
            $(".init").attr("id",id);

        	getItems(id,0);
        	
         
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
              token=response
              var folderPicker = new Box.FolderPicker();
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
                      selectedType='folders';
                      $('.tryselect').trigger('click');
                  });

                });

                  $("#folderClicked").trigger("click");
            },
            error: function(response) {
              console.log("bad response from getToken:" + response);
            }
          });

        }
      });
});
function getItems(folderId,parentId) {
   $.ajax({
     url: 'https://api.box.com/2.0/folders/' + folderId + '/items?fields=id,name,type,owned_by',
     type: 'get',
     headers: {
       "Authorization":"Bearer " + token,
       "Content-Type":"application/json"
     },
     dataType: 'json',
     success: function(response) {
       $.each(response.entries, function(k, data) {
         if(data.type=='folder' && data.owned_by.name=='Peter Christensen') {
           console.log(data.name + ":" + folderId + ":" + parentId);
           var p = $("<ul id="  +data.id + "></ul");
           p.append($("<li class='uf'  parent=" + parentId + ">"+data.name + "</li>"));
           $("#" + folderId).append(p);
           window.setTimeout(1000,getItems(data.id,folderId));
           window.setTimeout(1000,getCollaborators(data.id,folderId));
         }

       });
      
     }});
 }
 function  getCollaborators(folderId,parentId) {
   $.ajax({
     url: 'https://api.box.com/2.0/folders/' + folderId + '/collaborations',
     type: 'get',
     headers: {
       "Authorization":"Bearer " + token
     },
     success: function(response) {
       var p = $("<ul></ul");
       var appendIt=false;
       $.each(response.entries, function(k, data) {

         if(folderId==data.item.id) {
           appendIt=true;
           p.append($("<li class='pf' id='u_" + folderId + "'>"+data.accessible_by.login + " (" + data.role + ") <span  class='badge badge-primary badge-pill remove' onclick='removeCollaboration(this,\"" + data.id + "\")'>x</span></li>"));
         }
         });
         if(appendIt) {
           $("#" + folderId).append(p);
         }
         
       }
     });

 }
	 function removeCollaboration(element,id) {
		 $.ajax({
		     url: 'https://api.box.com/2.0/collaborations/' + id,
		     type: 'delete',
		     headers: {
		       "Authorization":"Bearer " + token
		     },
		     success: function(response) {
		    	 console.log("Deleted ok"  + element + ":" + $(element));
		    	 $(element).parent().fadeOut("normal",function() {$(this).remove();});
		     }
		  });
	 }
