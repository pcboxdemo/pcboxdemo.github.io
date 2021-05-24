var token;
var id;
var selectedType;
var userId;
var contentExplorerB;
var contentExplorerA;
$(document).ready(function () {
	
	
	
  $('ul.tabs li').click(function(){
  		var tab_id = $(this).attr('data-tab');

  		$('ul.tabs li').removeClass('current');
  		$('.tab-content').removeClass('current');

  		$(this).addClass('current');
  		$("#"+tab_id).addClass('current');
  	});
      $(".resetBtb").click(function(e) {
        location.reload(true);


      });
      $(".copyStd").click(function(e) {
        e.preventDefault();
        var copyText = document.getElementById("stdToken");
        $("#stdToken").show();
        copyText.select();
        document.execCommand("copy");
        $("#stdToken").hide();

      });
      $(".copyScope").click(function(e) {
        e.preventDefault();
        var copyText = document.getElementById("scopedToken");
        $("#scopedToken").show();
        copyText.select();
        document.execCommand("copy");
        $("#scopedToken").hide();

      });
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
        $(".loader1").show();
        $(".loader2").show();
        $("#tab-3").addClass("current");
        console.log("I want from nav:" + $(this).attr('id'));
        if($(this).attr('id')=='tryClicked' && !$(this).hasClass('disabled')) {
          //$.ajax({
          //  url: 'https://bl2vhdoqzh.execute-api.eu-west-2.amazonaws.com/default/box-jwt-tokengenerator',
          //  type: 'get',
          //  data: {
          //    "requestedTokens": "scopedToken",
          //    "requestedScopes": getRequestedScopes(),
          //    "resourceId":id,
          //    "resourceType":selectedType,
          //    "clientId":sessionStorage.getItem("clientId"),
          //    "userId":$("#users").val()
           // },
        	$.ajax( {
        		url:'https://api.box.com/oauth2/token',
        		type:'post',
        		headers: {
        			"Content-Type": "application/x-www-form-urlencoded"
        		},
        		data: {
        			"grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
        		    "scope": getRequestedScopes(),
        		    "subject_token_type": "urn:ietf:params:oauth:token-type:access_token",
        		    "subject_token": token,
        		    "resource": "https://api.box.com/2.0/" + selectedType + "/" + id
        		},
            dataType: 'json',
            success: function(response) {
              $("#stdToken").val(token);
              $("#scopedToken").val(response.access_token);
              if(selectedType=='folders') {
                if(contentExplorerA) {
                  contentExplorerA.clearCache();
                  contentExplorerA.hide();
                }
                if(contentExplorerB) {
                  contentExplorerB.clearCache();
                  contentExplorerB.hide();
                }
                loadExplorers(response.access_token);
              }
              else {
                loadPreviews(response.access_token);

              }
              
            }
          });
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
                      console.log("showing folder checkboxes");
                      $(".checkboxFolder").show();
                      $(".checkboxFile").show();
                      $('.scopesselect').trigger('click');
                  });

                });
                var filePicker = new Box.FilePicker();
                  filePicker.show('0', token, {
                      container: '.fileChooser',
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
                  filePicker.addListener('choose', function(response) {
                    $.each(response, function(k, data) {
                        console.log(JSON.stringify(data));
                        id = data.id;
                        selectedType='files';
                        $(".checkboxFile").show();
                        $(".checkboxFolder").hide();
                        $('.scopesselect').trigger('click');
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
function loadExplorers(scopedToken) {

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
  $(".loader1").hide();
  contentExplorerB = new Box.ContentExplorer();
  contentExplorerB.show(id,scopedToken,{
      container: '.explorer-b',
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
  $(".loader2").hide();
  contentExplorerA.addListener('create',function(data) {
    console.log('created:' + data);
    contentExplorerB.refresh();
  });
}
function loadPreviews(scopedToken) {

  contentExplorerA = new Box.Preview();
  contentExplorerA.show(id,token,{
      container: '.explorer-a',
      showDownload:true,
      showAnnotations:true,
        contentSidebarProps: {
          hasMetadata: true,
          hasSkills: true,
          hasProperties: true,
          hasAccessStats: true,
          defaultView:'metadata'
        }

  });
  $(".loader1").hide();
  contentExplorerB = new Box.Preview();
  contentExplorerB.show(id,scopedToken,{
      container: '.explorer-b',
      showDownload:true,
      showAnnotations:true,
        contentSidebarProps: {
          hasMetadata: true,
          hasSkills: true,
          hasProperties: true,
          hasAccessStats: true,
          defaultView:'metadata'
        }

  });
  $(".loader2").hide();
}
function getRequestedScopes() {
  var scopes="";
  var scopesNice="";
  var delim="";
  var delimNice="";
  $. each($("input[type='checkbox']:checked"), function(){
      if($(this).attr("id")) {
        scopes+=delim+$(this).attr("id");
        scopesNice+=delimNice+$(this).next().text();
        delim="|";
        delimNice=" ";
      }
  });
  return scopes;
}
