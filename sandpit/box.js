//Change this to change Application context
var clientId="bn2iyg37p78jkowrp0io0nc2ln0be3wt";
$(document).ready(function() {
      //sessionStorage.clear();
      //$('#userloginForm').on('submit', (function(ev) {
      //  $("#signbutton").hide();
      //  $("#loader").show();
      //  ev.preventDefault();
      //  console.log("Form submitted:" + $("#userLogin").val());
        var userLogin = 'AppUser_572053_QKuD6swDA3@boxdevedition.com';
        var urlParams = "code=Jq4te0OgMV6LCHpC0NrJu91aZpS/M0x56e6MzZdROAEL2kdkocaLmA==&clientId=" + clientId + "&userEmail=" + userLogin;
        console.log(urlParams);
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://bl2vhdoqzh.execute-api.eu-west-2.amazonaws.com/default/box-jwt-tokengenerator?" + urlParams,
          "method": "GET",
          "headers": {}
        };
        $.ajax(settings).done(function(response) {
          console.log(response);
          accessToken = response.token;
          sessionStorage.setItem("accessToken",accessToken);
          sessionStorage.setItem("userLogin",userLogin);
          sessionStorage.setItem("adminAccessToken",response.adminAccessToken);
          console.log("from storage access:" + sessionStorage.getItem("accessToken"));
          console.log("from storage admin:" + sessionStorage.getItem("adminAccessToken"));
          var contentExplorer = new Box.ContentExplorer();
            contentExplorer.show('0', accessToken, {
                container: '.pcontainer',
                contentPreviewProps: {
                    contentSidebarProps: {
                      hasMetadata: false,
                      hasSkills: true,
                      hasProperties: true,
                      hasAccessStats: true,
                      hasActivityFeed: true,
                    defaultView:'activityFeed'
                  }
                }


            });


        });
    //}));
});
