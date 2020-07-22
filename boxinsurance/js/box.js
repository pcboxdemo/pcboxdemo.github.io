//Change this to change Application context
var clientId="31qmnbdj4qj5d7ltqqn42wyji75rod9d";
$(document).ready(function() {
    sessionStorage.clear();
      $('#userloginForm').on('submit', (function(ev) {
        $("#signbutton").hide();
        $("#loader").show();
        ev.preventDefault();
        console.log("Form submitted:" + $("#userLogin").val());
        var userLogin = $("#userLogin").val();
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
          if(userLogin=='jmahedy+claimsagent@box.com') {
            window.location.replace('/boxinsurance/html/dashboard.html');
          }
          else {
            window.location.replace('/boxinsurance/html/customer.html');
          }


        });
    }));
});
