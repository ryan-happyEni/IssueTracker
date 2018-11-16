"use strict";

function loadList(page){ 
    if(page==null){
        page = $(".pagination > .active > a").html();
    }
    var param = {};
    param.user_name = $("#user_name").val();
    param.page=page;

    var requestType = "POST";
    var url = "/env/user/list";
    var contentType = null;
    var dataType="json";
    var data = param;
        
    sendRequest(requestType, url, data, contentType, dataType, function(returnData){
        var list = $("#user_list > tbody");
        list.empty();
        if(returnData!=null && returnData.length>0){
            $.each(returnData, function(index, value){
                var tr = document.createElement("tr");
                list.append(tr);
                
                var td = document.createElement("td");
                tr.appendChild(td);
                td.innerHTML = value.user_seq;
                
                var td = document.createElement("td");
                tr.appendChild(td);
                td.onclick=function(){
                    viewInfo(value);
                }
                
                var alink = document.createElement("a");
                td.appendChild(alink);
                alink.href="#";
                alink.innerHTML = value.user_name;
                
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
    $("#m_user_seq").val(info.user_seq);
    $("#m_user_name").val(info.user_name);

    $('#updateModal').modal('show');
}

function doSave(){ 
    if(checkValidation("insertForm")){ 
        var param = {};
        param.user_name = $("#user_name").val();
    
        var requestType = "POST";
        var url = "/env/user/insert";
        var contentType = null;
        var dataType="json";
        var data = param;
         
        sendRequest(requestType, url, data, contentType, dataType, function(returnData){
            if(returnData.result == "success"){
                inputReset();
                loadList();
            }
        }, function(errorData){
            if(errorData.resonseText!="success"){
                alert("fail");
            }
        });
    }
}

function doUpdate(){ 
    if(checkValidation("updateForm")){ 
        var param = {};
        param.user_seq = $("#m_user_seq").val();
        param.user_name = $("#m_user_name").val();
    
        var requestType = "POST";
        var url = "/env/user/update";
        var contentType = null;
        var dataType="json";
        var data = param;
         
        sendRequest(requestType, url, data, contentType, dataType, function(returnData){
            if(returnData.result == "success"){
                $('#updateModal').modal('hide');
                loadList();
            }
        }, function(errorData){
            if(errorData.resonseText!="success"){
                alert("fail");
            }
        });
    }
}

function doDelete(){ 
    var msg = "삭제하시겠습니까?";
    if(confirm(msg)){ 
        var param = {};
        param.user_seq = $("#m_user_seq").val();
    
        var requestType = "POST";
        var url = "/env/user/delete";
        var contentType = null;
        var dataType="json";
        var data = param;
         
        sendRequest(requestType, url, data, contentType, dataType, function(returnData){
            if(returnData.result == "success"){
                $('#updateModal').modal('hide');
                loadList();
            }
        }, function(errorData){
            if(errorData.resonseText!="success"){
                alert("fail");
            }
        });
    }
}

function inputReset(){
    var els=["user_name"];
    elementReset(els);
    
    $("#insertForm").removeClass('was-validated');
    $('#insertModal').modal('hide');
}

function initBtn(){
    $("#btn_cancel").click(function(){
        inputReset();
    });
    $("#btn_save").click(function(){
        doSave();
    });
    $("#btn_m_cancel").click(function(){
        $('#updateModal').modal('hide');
    });
    $("#btn_m_save").click(function(){
        doUpdate();
    });
    $("#btn_m_delete").click(function(){
        doDelete();
    });

    $("#btn_test").click(function(){
        for(var i=0; i<50; i++){
            
            var param = {};
            param.user_name = "P"+i;
        
            var requestType = "POST";
            var url = "/env/user/insert";
            var contentType = null;
            var dataType="json";
            var data = param;
            
            sendRequest(requestType, url, data, contentType, dataType, function(returnData){
            }, function(errorData){
            });
        }
    });
}

$(document).ready(function() {
    initBtn(); 
    loadList();
});