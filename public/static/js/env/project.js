"use strict";

function loadList(page){ 
    if(page==null){
        page = $(".pagination > .active > a").html();
    }
    var param = {};
    param.project_name = $("#project_name").val();
    param.page=page;

    var requestType = "POST";
    var url = "/env/project/list";
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
    $("#m_project_seq").val(info.project_seq);
    $("#m_project_name").val(info.project_name);

    loadComponentList();
    $('#updateModal').modal('show');
}

function doSave(){ 
    if(checkValidation("insertForm")){ 
        var param = {};
        param.project_name = $("#project_name").val();
    
        var requestType = "POST";
        var url = "/env/project/insert";
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
        param.project_seq = $("#m_project_seq").val();
        param.project_name = $("#m_project_name").val();
    
        var requestType = "POST";
        var url = "/env/project/update";
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
        param.project_seq = $("#m_project_seq").val();
    
        var requestType = "POST";
        var url = "/env/project/delete";
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
    var els=["project_name"];
    elementReset(els);
    
    $("#insertForm").removeClass('was-validated');
    $('#insertModal').modal('hide');
}



function loadComponentList(){     
    var param = {};
    param.project_seq = $("#m_project_seq").val();
    param.page=1;

    var requestType = "POST";
    var url = "/env/project/component/list";
    var contentType = null;
    var dataType="json";
    var data = param;
        
    sendRequest(requestType, url, data, contentType, dataType, function(returnData){
        var list = $("#component_list > tbody");
        list.empty();
        if(returnData!=null && returnData.length>0){
            $.each(returnData, function(index, value){
                addComponent(value);
            }); 
        }
    }, function(errorData){
        console.log(errorData)
        alert("fail");
    });
}

function doSaveComponent(seq, name, charge, desc){ 
    var param = {}; 
   
    if(name.value!="" && charge.value!="" && desc.value!=""){
        var component={
            project_seq:$("#m_project_seq").val(),
            component_seq:seq.value,
            component_name:name.value,
            component_charge:charge.value,
            component_desc:desc.value
        }
        param.component=component;
        
        param = JSON.stringify(param);
        
        var requestType = "POST";
        var url = "/env/project/component/modify";
        var contentType = "application/json";
        var dataType="json";
        var data = param;
            
        sendRequest(requestType, url, data, contentType, dataType, function(returnData){
            if(returnData.result == "success"){
                seq.value=returnData.component_seq;
            }
        }, function(errorData){
            if(errorData.resonseText!="success"){
                console.log("fail");
            }
        });
    } 
}


function doDeleteComponent(component_seq){ 
    var msg = "삭제하시겠습니까?";
    if(confirm(msg)){ 
        var param = {};
        param.project_seq = $("#m_project_seq").val();
        param.component_seq = component_seq.value; 
    
        var requestType = "POST";
        var url = "/env/project/component/delete";
        var contentType = null;
        var dataType="json";
        var data = param;
         
        sendRequest(requestType, url, data, contentType, dataType, function(returnData){
            if(returnData.result == "success"){
                $(component_seq).parent().parent().remove();
            }
        }, function(errorData){
            if(errorData.resonseText!="success"){
                console.log("fail");
            }
        });
    }
}

function addComponent(data){
    var list = $("#component_list");

    var tr = document.createElement("tr");
    list.append(tr);
    
    var td = document.createElement("td");
    tr.appendChild(td);
    
    var seq = document.createElement("input");
    td.appendChild(seq);
    seq.type="checkbox";
    seq.className="form-control";
    seq.name="m_component_seq";
    seq.value=data.component_seq;
    seq.onclick=function(){
        if(this.value==""){
            $(this).parent().parent().remove();
        }else{
            doDeleteComponent(this);
        }
    }
    
    var td = document.createElement("td");
    tr.appendChild(td);
    
    var name = document.createElement("input");
    td.appendChild(name);
    name.type="text";
    name.className="form-control";
    name.name="m_component_name";
    name.value=data.component_name;
    name.placeholder="구성요소 입력";
    
    var td = document.createElement("td");
    tr.appendChild(td);
    
    var charge = document.createElement("input");
    td.appendChild(charge);
    charge.type="text";
    charge.className="form-control";
    charge.name="m_component_charge";
    charge.value=data.component_charge;
    charge.placeholder="담당 입력"; 
    
    var td = document.createElement("td");
    tr.appendChild(td);
    
    var desc = document.createElement("input");
    td.appendChild(desc);
    desc.type="text";
    desc.className="form-control";
    desc.name="m_component_desc";
    desc.value=data.component_desc;
    desc.placeholder="설명 입력"; 

    

    $(name).blur(function(){
        doSaveComponent(seq, name, charge, desc)
    });
    $(charge).blur(function(){
        doSaveComponent(seq, name, charge, desc)
    });
    $(desc).blur(function(){
        doSaveComponent(seq, name, charge, desc)
    });
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
 
    $("#btn_insert_component").click(function(){
        var data = {component_seq:"", component_name:"", component_charge:"", component_desc:""}
        addComponent(data);
    });    
}

$(document).ready(function() {
    initBtn(); 
    loadList();
});