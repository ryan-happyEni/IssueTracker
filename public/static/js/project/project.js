"use strict";

function loadList(page){ 
    if(page==null){
        page = $(".pagination > .active > a").html();
    }
    var param = {};
    param.project_name = $("#project_name").val();
    param.page=page;

    var requestType = "POST";
    var url = "/project/list";
    var contentType = null;
    var dataType="json";
    var data = param;
        
    sendRequest(requestType, url, data, contentType, dataType, function(returnData){
        var list = $("#project_list > tbody");
        list.empty();
        if(returnData!=null && returnData.length>0){
            $.each(returnData, function(index, value){
                var tr = document.createElement("tr");
                list.append(tr);
                
                var td = document.createElement("td");
                tr.appendChild(td);
                td.innerHTML = value.project_seq;
                
                var td = document.createElement("td");
                tr.appendChild(td);
                td.onclick=function(){
                    viewInfo(value);
                }
                
                var alink = document.createElement("a");
                td.appendChild(alink);
                alink.href="#";
                alink.innerHTML = value.project_name;
                
                var td = document.createElement("td");
                tr.appendChild(td);
                td.innerHTML = value.write_date;
            });
            var pageInfo = returnData[0].pageInfo; 
            if(pageInfo!=null){
                buildPageNav($(".pagination"), pageInfo, loadList);
            }

        }
    }, function(errorData){
        console.log(errorData)
        alert("fail");
    });
}


function viewInfo(info){     
    location.href="/project/info/"+info.project_seq;
}
 

function inputReset(){ 
    $('#viewModal').modal('hide');
}

function initBtn(){
    $("#btn_cancel").click(function(){
        inputReset();
    });  
}

$(document).ready(function() {
    initBtn(); 
    loadList();
});