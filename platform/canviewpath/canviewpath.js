var userAId;
var userBId;
var userAToken;
var userBToken;
var scToken;
var explorerA = new Box.ContentExplorer();
var explorerB = new Box.ContentExplorer();
var explorerSA = new Box.ContentExplorer();

$(document).ready(function () {

	
	$(".resetBtb").click(function(ev) {
		console.log("reset clicked");
		//delete users? What about content?
	});
  $(".form-inline").on('submit', (function(ev) {
    ev.preventDefault();
    //read folderId and user
    var folderId = $("#folderId").val();
    var user = $("#appUser").val();
    var canViewPath = $("#canViewPath").is(":checked");
    var cvp="";
    console.log(canViewPath);
    if(canViewPath) {
        cvp=", \"can_view_path\":true";
    };
    var data = "{\"item\":{\"id\":\"" + folderId + "\",\"type\":\"folder\"},\"accessible_by\":{\"id\":\"" + user + "\"},\"role\":\"editor\"" + cvp + "}";
    $.ajax({
      url: 'https://api.box.com/2.0/collaborations',
      headers: {"Authorization": "Bearer "+scToken},
      type: 'post',
      data:data,
      success: function(response) {
        console.log("created");
        explorerA.clearCache();
        explorerA.hide();
        explorerA.show('0', userAToken, {
          container: '.explorer-a',
          logoUrl: ""
        });
        explorerB.clearCache();
        explorerB.hide();
        explorerB.show('0', userBToken, {
          container: '.explorer-b',
          logoUrl: ""
        });
        //explorerA.refresh();
        //explorerB.refresh();
      },
      error: function(data) {
        console.log("error:" + data);
      }
    });
    //set collaboration - check can view path setting
    //refresh contentExplorers
  }));

  var navListItems = $('div.setup-panel div a'),
     allWells = $('.setup-content'),
     allNextBtn = $('.nextBtn');

 allWells.hide();

 navListItems.click(function (e) {
     e.preventDefault();
     console.log($(this).attr('id') + " clicked:" + $(this).hasClass('disabled'));
     if($(this).attr('id')=='tryClicked' && !$(this).hasClass('disabled')) {
       //create two app user and save IDs
       $.ajax({
         url: '/sandpit',
         type: 'get',
         data: {
           "cmd": "createAppUsers",
           "app": sessionStorage.getItem("clientId")
         },
         dataType: 'json',
         success: function(response) {
           console.log(response);
           $("#appUser").append('<option value=dontchoose>Select user</option>');

           $.each(response, function(key, value) {
            if(key=='userA') {
              userAId=value.id;
              userAToken=value.token;
              $("#appUser").append('<option value=' + value.id + ' >UserA </option>');

            }
            if(key=='userB') {
              userBId=value.id;
              userBToken=value.token;
              $("#appUser").append('<option value=' + value.id + ' >UserB </option>');

            }
            if(key=='sc') {
              scToken=value.token;
            }
           });
           //Got users - load explorers and drop down

           explorerA.show('0', userAToken, {
             container: '.explorer-a',
             logoUrl: ""
           });

           explorerB.show('0', userBToken, {
             container: '.explorer-b',
             logoUrl: ""
           });

           explorerSA.show('0',  scToken, {
             container: '.explorer-sa',
             logoUrl: ""
           });

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
 $(".resetBtb").click(function(ev) {
   console.log("Deletting a and b");
   var done =false;
   $.ajax({
     url: 'https://api.box.com/2.0/users/' + userAId +'?notify=true&force=true',
     headers: {"Authorization": "Bearer "+scToken},
     type: 'delete',
     data: {},
     dataType: 'json',
     success: function(response) {
       if(done) {
         location.reload(true);
       }
       done=true;
       console.log("A deleted");}
   });
   $.ajax({
     url: 'https://api.box.com/2.0/users/' + userBId +'?notify=true&force=true',
     headers: {"Authorization": "Bearer "+scToken},

     type: 'delete',
     data: {},
     dataType: 'json',
     success: function(response) {
       if(done) {
         location.reload(true);
       }
       done=true;
       console.log("B deleted");
       }
     });
   });
  });




explorerSA.addListener('select', (item) => {
  document.getElementById("targetFolder").value = item[0].name;
  document.getElementById("folderId").value = item[0].id;
  document.getElementById("collabButton").disabled = false;
})
