var token;
var id;
var selectedType;
var userId;
var contentExplorerB;
var contentExplorerA;
$(document).ready(function () {
	
	
	



   
     
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
           //window.setTimeout(1000,getCollaborators(data.id,folderId));
         }

       });
      
     }});
 }
 
