class Policy {

  constructor(id, policyType, policyStartDate, policyEndDate, vehicleType, vehicleModel, engineSize, policyNumber, name, policyHolder, parentId) {
    this.id = id;
    this.policyType = policyType;
    this.policyStartDate = policyStartDate;
    this.policyEndDate = policyEndDate;
    this.vehicleType = vehicleType;
    this.vehicleModel = vehicleModel;
    this.engineSize = engineSize;
    this.name = name;
    this.policyNumber = policyNumber;
    this.policyHolder = policyHolder;
    this.parentId = parentId
  };

  getPolicyIcon() {
    console.log(this.policyType);
    if (this.policyType == 'Motor') {
      console.log('return car');
      return 'car_policy.png';
    } else if (this.policyType == 'Home') {
      return 'home_policy.png';
    } else if (this.policyType == 'Commercial') {
      return 'commercial_policy.png';
    } else if (this.policyType == 'Health') {
      return 'health_policy.png';
    }
  }
}
//var aFolder = new Folder('65286002498','Auto Physical Damage Claim','29th Jan','Waiting for review','High','I am writing this to file a report for a car accident in which I was involved on the 5th of February. I was driving my Hyundai i10, 9678 in Bandra when a Honda city, 7845 came in a rush and hit me from behind. My car was totally smashed and damaged','John Mahedy');
var policyId;

function loadPolicyData(folderId, name) {
  var folderPathSettings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.box.com/2.0/folders?parent_id=65937358294&path=" + name + "%2FPolicy Documents",
    "method": "GET",
    "headers": {
      "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
      "Cache-Control": "no-cache"
    }
  };
  //first find policy documents folder for user
  $.ajax(folderPathSettings).done(function(response) {
    console.log(response);

      var polId = response.entries[0].id;
      policyId=polId
      url = "https://api.box.com/2.0/folders/" + polId+ "/items?fields=id,name,metadata.enterprise.policy";
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
          "Authorization": "Bearer " + sessionStorage.getItem("accessToken"),
          "Cache-Control": "no-cache"
        }
      };
      $.ajax(settings).done(function(response) {
        console.log(response);
        var i = 0;
        $.each(response.entries, function(k, data) {
          console.log(data);
          var policyFolder = new Policy(data.id,
            data.metadata.enterprise.policy.policyType,
            data.metadata.enterprise.policy.policyStartDate,
            data.metadata.enterprise.policy.policyEndDate,
            data.metadata.enterprise.policy.vehicleType,
            data.metadata.enterprise.policy.vehicleModel,
            data.metadata.enterprise.policy.engineSize,
            data.metadata.enterprise.policy.policyNumber,
            data.name,
            name,
            polId);
          loadPolicy(policyFolder);
        });
        loadAllClaims('65306596707');

      });
    });

  }






function loadPolicy(myFolder) {
  console.log(myFolder.getPolicyIcon());
  $("#folderGroupPolicy").append('<div class="wrapper">' +
    '<div class="card radius shadowDepth1">' +
    '<div class="card__content card__padding" >' +
    '<div class="card__share card__pol">' +
    '<div class="card__social">' +
    //'<a class="share-icon facebook" href="/claims/file_view/' + myFolder.id + '"><span class="fa fa-file icon-padding"></span></a>' +
    //'<a class="share-icon twitter" href="" data-toggle="modal" data-id="107"><span class="fa fa-phone icon-padding trigger" data-toggle="modal" data-id="' + myFolder.id + '"></span></a>' +
    //'<a class="share-icon googleplus" href="/claims/approve/<%= folder.id %>"><span class="fa fa-clipboard icon-padding"></span></a>' +
    //'<a class="share-icon googleplus" href="/claims/approve/<%= folder.id %>"><span class="fa fa-thumbs-o-up icon-padding"></span></a>' +
    '</div>' +
    '<a id="sharePolicy" class="share-toggle share-icon" href="#"></a>' +
    '</div>' +
    '<div class="card__action">' +
    '<div class="card__author">' +
    '<img style="margin-left:-20px;" src="/boxinsurance/img/' + myFolder.getPolicyIcon() + '">' +
    '<div class="card__author-content lato-font" style="font-size:15px;">' +
    '  Policy Number' +
    '</br>' +
    '  <a style="color:#666666;font-size:14px;padding-left:6px;" class="lato-font">' + myFolder.policyNumber + '</a>' +
    '<br/>' +
    '  <time>05-03-2019</time>-' +
    '  <time>04-03-2020</time>' +
    '</div>' +
    '<div style="float:right;padding-top:12px;" class="lato-font">' +
    '  Policy Type' +
    '</br>' +
    ' <a style="color:#888888;font-size:14px;padding-left:0px;" class="lato-font">' + myFolder.policyType + '</a>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<hr>' +

    '<article style="font-size:15px;" class="card__article" id="contentBoxPolicy">' +
    '<div id="contentBox">' +
    '   <div style="padding-left:10%;" class="column leftpush">' +
    '      <i class="fa fa-id-card" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:40px;" aria-hidden="true"><span style="font-size:13px;padding-left:5px;" class="lato-font"> Policy Number: </span><span style="font-size:13px;color:#888888;" class="lato-font">' + myFolder.policyNumber + '</span></i>' +
    '      <i class="fa fa-car" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:15px;" aria-hidden="true"><span style="font-size:13px;padding-left:5px;" class="lato-font"> Vehicle Type: </span><span style="font-size:13px;color:#888888" class="lato-font">' + myFolder.vehicleType + '</span></i>' +


    '   </div>' +
    '   <div style="padding-left:10%;" class="column">' +
    '       <i class="fa fa-user-circle" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:55px;" aria-hidden="true"><span style="font-size:13px; padding-left:5px;" class="lato-font">  Policy Holder: </span><span style="font-size:13px;color:#888888" class="lato-font">' + myFolder.policyHolder + '</span></i>' +
    '       <i class="fa fa-user-circle" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:15px;" aria-hidden="true"><span style="font-size:13px; padding-left:5px;" class="lato-font">  Vehicle Model: </span><span style="font-size:13px;color:#888888" class="lato-font">' + myFolder.vehicleModel + '</span></i>' +
    '    </div>' +
    '   <div style="padding-left:10%;" class="column">' +
    '       <i class="fa  fa-paperclip" style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:60px;" aria-hidden="true"><span style="font-size:13px; padding-left:5px;" class="lato-font">  Claims: </span><span style="font-size:13px;color:#888888" class="lato-font" id="claimCounter">0</span></i>' +
    '    </div>' +
    '</div>' +
    '<div style="margin-left:95%;margin-top:1%;">' +
    //'<a class="button small" href="/claims/full_report/<%= folder.id %>"><span style="color:white">Full Report</span></a>' +
    //'<button class="button small explorer-toggle-policy" style="font-size:12px">Files <i class="fa fa-angle-double-down"></i></button>' +
    ' <i style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:5px;" class="fa fa-file" aria-hidden="true"></i><i style="white-space:nowrap;width:0!important;color:#039BE5;padding-top:2px;padding-right:5px;" id="file_indicator" class="fa fa-angle-double-down explorer-toggle-policy" folder-id="' + myFolder.id + '">' +
    //'<a folder-id="' + myFolder.id + '" class="button small explorer-toggle-policy" href="#"><span style="color:white">Claim Files <i class="fa fa-angle-double-down"></span></a>' +
    '</div>' +
    '<div style="margin-top:10px;" class="contentpreview" >' +
    '</div>' +
    '</article>' +

    '</div>' +
    '</div>' +
    '</div>');
  $('.card__pol > a').on('click', function(e) {
    console.log("clicked");
    e.preventDefault(); // prevent default action - hash doesn't appear in url
    //$(this).parent().find('div').toggleClass('card__social--active');
    //$(this).toggleClass('share-expanded');
  //  console.log($(this).id);
    $("#contentBoxPolicy").slideToggle(500, function () {
      console.log('here');

    });

    });
  $('.explorer-toggle-policy').on('click', function(e) {
    console.log("clicked policy files");
    e.preventDefault();
    var showExplorer = true;
    var container = '.contentpreview';
    if ($(this).hasClass("fa-angle-double-down")) {
      $(this).removeClass("fa-angle-double-down");
      $(this).addClass("fa-angle-double-up");

    } else {
      $(this).removeClass("fa-angle-double-up");
      $(this).addClass("fa-angle-double-down");
      showExplorer = false;
      //$('.contentexplorer_' + $(".explorer-toggle-policy").attr("folder-id")).height=0px;
    }
    if (!showExplorer && contentExplorerPolicy) {
      //contentExplorerPolicy.hide();
      //contentExplorerPolicy.clearCache();
      $(container).removeClass("positionHackOff");

      $(container).addClass("positionHack");

    } else {
      $(container).removeClass("positionHack");
      $(container).addClass("positionHackOff");

      $(container).height(600);
      console.log(container + ":" + $(container));
      contentExplorerPolicy = new Box.ContentPreview();
      contentExplorerPolicy.show($(".explorer-toggle-policy").attr("folder-id"), sessionStorage.getItem("accessToken"), {
        container:'.contentpreview',
        showDownload:true

        });
    }
  });
}
