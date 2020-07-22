

var completeInactive = 'step--complete step--inactive';
var completeActive = 'step--complete step--active';
var incompleteInactive = 'step--incomplete step--inactive';

class Folder {
  constructor(id,claimType,creationDate,claimStage,claimPriority,description,policyHolder,policyNumber,name) {
    this.id=id;
    this.claimType=claimType;
    this.creationDate=creationDate;
    this.claimStage=claimStage;
    this.claimPriority=claimPriority;
    this.description=description;
    this.policyHolder=policyHolder;
    this.name=name;
    this.policyNumber=policyNumber;
  };

getClaimStatusClass(displayStage) {
  //if stage Received
  if(this.claimStage=='Received') {
    if(displayStage=='Received') {return completeActive}
    else  {return incompleteInactive}
  }
  else if(this.claimStage=='Adjuster') {
    if(displayStage=='Received') {return completeInactive}
    else if(displayStage=='Adjust')  {return CompleteActive}
    else {return incompleteInactive}
  }
  else if(this.claimStage=='Complete') {
    if(displayStage=='Received') {return completeInactive}
    else if(displayStage=='Adjust')  {return CompleteInactive}
    else {return completeActive}
  }


  //if stage adjuster

  //if stage complete
}
  getClaimPolicyIcon() {
    console.log(this.claimType);
    if(this.claimType == 'Motor') {
      console.log('return car');
      return 'claim.png';
    }
    else if(this.claimType == 'Homeowner Damage Claim'){
      return  'home_policy.png';
    }
    else if(this.claimType == 'Commercial Claim'){
      return 'commercial_policy.png';
    }
    else if(this.claimType == 'Health Insurance Claim'){
      return 'health_policy.png';
    }
  }
}
var aFolder = new Folder('65286002498','Auto Physical Damage Claim','29th Jan','Waiting for review','High','I am writing this to file a report for a car accident in which I was involved on the 5th of February. I was driving my Hyundai i10, 9678 in Bandra when a Honda city, 7845 came in a rush and hit me from behind. My car was totally smashed and damaged','John Mahedy');


function loadAllClaims(folderId) {

  console.log("loading folder:" + folderId);
  url = "https://api.box.com/2.0/folders/" +folderId + "/items?fields=id,name,metadata.enterprise.claim";
  var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
          "Cache-Control": "no-cache"
        }
      }
      $.ajax(settings).done(function(response) {

        var i = 0;
        $.each(response.entries, function(k, data) {
          if(data.name.includes("mahedy")) {
          var claimFolder = new Folder(data.id,
            data.metadata.enterprise.claim.type,
            data.metadata.enterprise.claim.claimDate,
            data.metadata.enterprise.claim.claimStatus,
            'high',
            data.metadata.enterprise.claim.claimDescription,
            data.metadata.enterprise.claim.firstName,
            data.metadata.enterprise.claim.policyNumber,
            data.name
          );
          loadClaim(claimFolder);
        }
        });
});
}




function loadClaim(myFolder) {
  $("#claimCounter").text("1");
  var excess = (myFolder.claimStage=='Complete')?'<i class="fa fa-gbp" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:15px;" aria-hidden="true"><span style="font-size:13px; padding-left:5px;" class="lato-font">  Excess: </span><span style="font-size:13px;color:#888888" class="lato-font">£250</span></i>':'';
  $("#folderGroupClaim").append('<div class="wrapper">' +
    '<div class="card radius shadowDepth1">'+
      '<div class="card__content card__padding">' +
        '<div class="card__share card__claim" id="claimShare">' +
          '<div class="card__social">' +
            //'<a class="share-icon facebook" href="/claims/file_view/' + myFolder.id + '"><span class="fa fa-file icon-padding"></span></a>' +
            //'<a class="share-icon twitter" href="" data-toggle="modal" data-id="107"><span class="fa fa-phone icon-padding trigger" data-toggle="modal" data-id="' + myFolder.id + '"></span></a>' +
            //'<a class="share-icon clipboard" href="/claims/approve/<%= folder.id %>"><span class="fa fa-clipboard icon-padding"></span></a>' +
            //'<a title="Approve claim" class="share-icon googleplus" href="/claims/approve/<%= folder.id %>"><span class="fa fa-thumbs-o-up icon-padding"></span></a>' +
          '</div>' +
        '<a id="shareClaim" class="share-toggle share-icon" href="#"></a>' +
      '</div>' +
      '<div class="card__action">' +
        '<div class="card__author">' +
        '<img style="margin-left:-20px;" width="64" height="64" src="/boxinsurance/img/' + myFolder.getClaimPolicyIcon() + '">'+
          '<div class="card__author-content lato-font" style="font-size:15px;">' +
          '  Claim Number' +
          '</br>' +
          '  <a style="color:#666666;font-size:14px;padding-left:6px;" class="lato-font">' + myFolder.id +'</a>' +
          '<br/>'+
                '  <time>' + myFolder.creationDate + '</time>' +
          '</div>' +
          '<div style="float:right;padding-top:12px;" class="lato-font">' +
          '  Claim Type' +
          '</br>' +
          ' <a style="color:#888888;font-size:14px;padding-left:0px;" class="lato-font">' +myFolder.claimType + '</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<hr>' +

      '<article style="font-size:15px;" class="card__article" id="contentBoxClaim">' +
        '<div id="contentBox">' +
        '   <div style="padding-left:10%;" class="column leftpush">'+
        '      <i class="fa fa-id-card" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:15px;" aria-hidden="true"><span style="font-size:13px;padding-left:5px;" class="lato-font"> Policy Number: </span><span style="font-size:13px;color:#888888;" class="lato-font">' + myFolder.policyNumber + '</span></i>' +
        '        <i class="fa fa-check-circle" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:5px;" aria-hidden="true"><span style="font-size:13px;padding-left:5px;" class="lato-font"> Status: </span><span style="font-size:13px;color:#888888" class="lato-font">' + myFolder.claimStage+'</span></i>'+
        '   </div>'+
        '   <div style="padding-left:10%;" class="column">'+
        '       <i class="fa fa-user-circle" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:15px;" aria-hidden="true"><span style="font-size:13px; padding-left:5px;" class="lato-font">  Policy Holder: </span><span style="font-size:13px;color:#888888" class="lato-font">' + myFolder.policyHolder + '</span></i>'+
        excess +
         '    </div>'+
        '</div>' +
        '<div>' +
        ' <ul class="steps" style="margin-bottom:5%;padding-top:20px;">' +
        '   <li id="step1" class="step ' +  myFolder.getClaimStatusClass('Received') +' lato-font">' +
        '     <span class="step__icon"></span>' +
        '     <span class="step__label">Received</span>' +
        '   </li>' +
        '    <li id="step2" class="step ' +  myFolder.getClaimStatusClass('Adjustment') +' lato-font">' +
        '     <span class="step__icon"></span>' +
        '      <span class="step__label">Adjustment</span>' +
        '    </li>' +
        '   <li id="step3" class="step ' +  myFolder.getClaimStatusClass('Complete') +' lato-font">' +
        '      <span class="step__icon"></span>' +
        '     <span class="step__label">Completed</span>' +
        '   </li>' +
        ' </ul>' +
        '</div>' +
        '<i class="fa fa-info-circle" style="width:0!important;color:#F96F67;padding-top:2px;" aria-hidden="true"><span style="font-size:13px;;margin-left:9px;" class="lato-font"> Incident Summary </span></i>'+
        '<span style="color:#888888;font-size:14px;" class="lato-font">' + myFolder.description + '</span>'+
        '<div style="margin-left:95%;margin-top:1%;">'+
        //'<a class="button small" href="/claims/full_report/<%= folder.id %>"><span style="color:white">Full Report</span></a>' +
        //'<button class="button small explorer-toggle-claim" style="font-size:12px">Files <i class="fa fa-angle-double-down"></i></button>' +
        ' <i style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:5px;" class="fa fa-folder" aria-hidden="true"></i><i style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:5px;" id="file_indicator" class="fa fa-angle-double-down explorer-toggle-claim" folder-id="' + myFolder.id + '">'+
        //'<a folder-id="' + myFolder.id + '" class="button small explorer-toggle-claim" href="#"><span style="color:white">Claim Files <i class="fa fa-angle-double-down"></span></a>' +
        '</div>'+
        '<div style="margin-top:10px;" class="contentexplorer_' +myFolder.id + '" id="contentexplorer_' +myFolder.id + '">' +
        '</div>'+
        '</article>'+

      '</div>'+
    '</div>'+
  '</div>');
  $('.card__claim > a').on('click', function(e){
    console.log("clicked");
    e.preventDefault(); // prevent default action - hash doesn't appear in url
    //$(this).parent().find( 'div' ).toggleClass( 'card__social--active' );
    //$(this).toggleClass('share-expanded');
      console.log($(this));
    $("#contentBoxClaim").slideToggle(500, function () {
      console.log('here');

    });
  });
  $('.explorer-toggle-claim').on('click', function(e) {
    console.log("clicked claim files");
    e.preventDefault();
    var showExplorer = true;
    if($(this).hasClass("fa-angle-double-down")) {
      $(this).removeClass("fa-angle-double-down");
      $(this).addClass("fa-angle-double-up");
    }
    else {
      $(this).removeClass("fa-angle-double-up");
      $(this).addClass("fa-angle-double-down");
      showExplorer=false;
    }
    if(!showExplorer && contentExplorerClaim) {
      contentExplorerClaim.hide();
      contentExplorerClaim.clearCache();
    }
    else {

      var container ='.contentexplorer_' + $(".explorer-toggle-claim").attr("folder-id");
      $(container).height(600);
      console.log(container + ":" + $(container));
      contentExplorerClaim = new Box.ContentExplorer();
      contentExplorerClaim.show($(".explorer-toggle-claim").attr("folder-id"),sessionStorage.getItem("accessToken"),{
          container: container,
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
      document.getElementById('contentexplorer_' + $(".explorer-toggle-claim").attr("folder-id")).scrollIntoView(false);
    }
  });
}
