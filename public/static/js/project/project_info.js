"use strict";

function loadList(){  
    var param = {};
    param.project_seq = $("#project_seq").val();
    param.page=1;

    var requestType = "POST";
    var url = "/project/component/list";
    var contentType = null;
    var dataType="json";
    var data = param;
        
    sendRequest(requestType, url, data, contentType, dataType, function(returnData){
        var list = $("#component_list");
        list.empty();
        if(returnData!=null && returnData.length>0){
            $.each(returnData, function(index, value){
                var div = document.createElement("div");
                list.append(div);
                div.className="media text-muted pt-3";
                
                var img = document.createElement("img");
                div.appendChild(img);
                img.className="mr-2 rounded";
                img.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1671167d81b%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1671167d81b%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.546875%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E";
                img.style.width="32px";
                img.style.height="32px";
                
                var p = document.createElement("p");
                div.appendChild(p);
                p.className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray";
                
                var strong = document.createElement("strong");
                p.appendChild(strong);
                strong.className="d-block text-gray-dark";
                strong.innerHTML = value.component_name;
                
                var span = document.createElement("span");
                p.appendChild(span);
                span.innerHTML = value.component_charge+"&nbsp;&nbsp;&nbsp;#"+value.component_desc;
            });
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