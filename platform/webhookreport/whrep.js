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
        	//initiate webhook report
        	
         
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

});

