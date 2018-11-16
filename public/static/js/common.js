
var processDim;
processDim = processDim || (function () {
    var pleaseWaitDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header" style="color:#fff;width:250px;margin-top:15%;margin-left:38%;border-bottom:0px;"><h1>Processing...</h1></div></div>');
    return {
        showPleaseWait: function() {
            pleaseWaitDiv.modal();
        },
        hidePleaseWait: function () {
            pleaseWaitDiv.modal('hide');
        },

    };
})();


function JSONstringifyStyle(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, '\t');
    }

    var 
        arr = [],
        _string = 'color:green',
        _number = 'color:darkorange',
        _boolean = 'color:blue',
        _null = 'color:magenta',
        _key = 'color:red';

    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var style = _number;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                style = _key;
            } else {
                style = _string;
            }
        } else if (/true|false/.test(match)) {
            style = _boolean;
        } else if (/null/.test(match)) {
            style = _null;
        } 
        return '<span style="'+ style + '">' + match + '</span>';
    });

    arr.unshift(json); 

    return arr;
}




function sendRequest(requestType, url, data, contentType, dataType, callBackFnc, errFnc){
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    
    var ajaxOption={};
    ajaxOption.type = requestType;
    ajaxOption.url = url;
    ajaxOption.data = data; 
	if(contentType!=null){
        ajaxOption.contentType = contentType;
    }
    if(dataType!=null){
        ajaxOption.dataType = dataType;
    }else{
        ajaxOption.processData = false;
    }  
    ajaxOption.cache = false;
    ajaxOption.timeout = 1000*60;
    ajaxOption.beforeSend=function(xhr) {
        if (header && token) {
            xhr.setRequestHeader(header, token);
        }
    }
    ajaxOption.success=function(returnData) {
        if(callBackFnc!=null){
            callBackFnc(returnData);
        }
    }
    ajaxOption.error=function(returnData) {
        sendRequestErrorHandler(returnData, errFnc);
    }
    $.ajax(ajaxOption);
}

function sendRequestErrorHandler(e, errFnc){
	var errorData = JSON.parse(JSON.stringify(e));
	if(errFnc!=null){
		errFnc(errorData);
	}
}

function checkValidation(formid){   
    var result = true; 
    var form = $("#"+formid) 

    if (form[0].checkValidity() === false) {
        result = false; 
        event.preventDefault()
        event.stopPropagation()
    }
    form.addClass('was-validated');
    return result;
}

function elementReset(els){
    if(els!=null && els.length>0){
        for(var i=0; i<els.length; i++){
            $("#"+els[i]).val("");
        }
    }
}

function buildPageNav(pageNav, pageInfo, fncName){
	if(pageInfo==null){
		pageInfo ={
			limit:10,
			page:1,
			last_page:1,
			total_cnt:0
		}
    }
	if(pageInfo.page<1){
		pageInfo.last_page=1;
	}
	if(pageInfo.last_page==0){
		pageInfo.last_page=1;
	}
    pageNav.empty();

	var s=1;
	var e=1;
	var page_size=10;
	var last_page = Math.round(pageInfo.total_cnt/pageInfo.limit);
	if(pageInfo.total_cnt>last_page*pageInfo.limit){
		last_page++;
	}
	pageInfo.last_page=last_page;
	
	s = Math.floor( (pageInfo.page-1)/page_size, 0)*page_size+1
	e = s+(page_size-1);

	if(e>pageInfo.last_page){
		e=pageInfo.last_page;
	}
	
	if(e==0){
		e=1;
	}


    var li = document.createElement("li");
	pageNav.append(li);
    li.className="page-item";
    var alink = document.createElement("a");
    li.appendChild(alink);
    alink.className="page-link";
    alink.innerHTML = "Prev";

	if(s>10){
        alink.href="#";
        $(alink).click(function(){
            fncName(s-1);
        });
	}else{
		alink.className="page-link disabled";
    }
    var parr=[];
	for(var p=s; p<=e; p++){
        parr[parr.length]=p;
    }
    
    $.each(parr, function(index, value){
        var li = document.createElement("li");
        pageNav.append(li);
        li.className="page-item"+(value==pageInfo.page?" active" : "");
        var alink = document.createElement("a");
        li.appendChild(alink);
        alink.className="page-link";
        alink.innerHTML = value;
        alink.href="#";
        $(alink).click(function(){
            $(".pagination > .active").removeClass("active");
            $(this).parent().addClass("active");
            fncName(value);
        }); 
    }); 

    var li = document.createElement("li");
	pageNav.append(li);
    li.className="page-item";
    var alink = document.createElement("a");
    li.appendChild(alink);
    alink.className="page-link";
    alink.innerHTML = "Next";

	if(e<pageInfo.last_page){
        alink.href="#";
        $(alink).click(function(){
            fncName(e+1);
        });
	}else{
		alink.className="page-link disabled";
	}
}