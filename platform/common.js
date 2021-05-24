function loadUsers(clientId) {
  $("#uloader").show();
  //var urlParams = new URLSearchParams(window.location.search);
  $("#apps").val(sessionStorage.getItem("clientId"));
  $.ajax({
    url: '/sandpit',
    type: 'get',
    data: {
      "cmd": "getUsers",
      "app": $("#apps").val()
    },
    dataType: 'json',
    success: function(response) {
      console.log("getUsers(): " + JSON.stringify(response));
      $("#users").empty();
      $("#users").append('<option value=dontchoose>Select user</option>');
      $.each(response['users'], function(key, value) {
        $("#users").append('<option value=' + key + ' >' + value + ' (' + key + ')</option>');
      });
      $("#uloader").hide();
    }
  });
};
