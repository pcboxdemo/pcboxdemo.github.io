var token;
var id;
var selectedType;
var userId;
var contentExplorerB;
var contentExplorerA;
var nextStreamPosition=null;
var sequence = function(callback) {
	  var i=0;

	  var request = function() {

	    return callback().then(function(size){
	    	if(size==0) {
	    		console.log("stop");
	    		return request(size);
	    	}

	    });
	  }
	  return request(0);
	  
	}
var asyncfunction=	function () {
  console.log("ST:"+nextStreamPosition);
	return $.ajax({
	  	url: 'https://api.box.com/2.0/events?limit=500&stream_type=admin_logs' + (nextStreamPosition==null?"&created_after=today":"&stream_position="+nextStreamPosition),
	  	type: 'get',
	     headers: {
	       "Authorization":"Bearer " + token,
	       "Content-Type":"application/json"
	     },
	     dataType: 'json'
	  })
	  .then(function(response){
		  console.log(response);
		  nextStreamPosition=response.next_stream_position;
		  $.each(response.entries, function(k, data) {
			  $("#events").append("<div>").append(data.event_type).append("</div>")
		  });
  	});
	
}
	 
$(document).ready(function () {
	window.setInterval(function() {
    sequence(asyncfunction).then(function(){
      console.log("All done");
  });
  }, 10000);
  
	
	$('#selectEvents').multiSelect();
	//20201016T00:00:00
//	$('#startDate').multiDatesPicker(
			//{
		//dateFormat: "yyyymmddThh:MM:ss",
	//	defaultDate:"20201201T00:00:00"
	//}
		///	);
	//$('#endDate').multiDatesPicker(
			//{
	//	dateFormat: "yyyymmddThh:MM:ss",
	//	defaultDate:"20201201T00:00:00"
	//}
	//		);
  
     var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

    allWells.hide();

    navListItems.click(function (e) {
    	$(".nextBtn").show();
        
        e.preventDefault();
        $(".loader").show();
        console.log("I want from nav:" + $(this).attr('id'));
        if($(this).attr('id')=='tryClicked' && !$(this).hasClass('disabled')) {
            $(".init").attr("id",id);

            sequence(asyncfunction).then(function(){
                console.log("All done");
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
            url: sessionStorage.getItem("url")+'/sandpit',
            type: 'get',
            data: {
              "cmd": "getToken","app": appSelect,"user": userSelect
            },
            dataType: 'json',
            success: function(response) {
              token=response
              
             
            },
            error: function(response) {
              console.log("bad response from getToken:" + response);
            }
          });

        }
      });
});

