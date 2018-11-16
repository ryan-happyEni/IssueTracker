

function loadSideMenu(){ 
    var side = $("#side-menu");
    side.empty();
    var pathname = location.pathname;
    var items = [];
    if(pathname.indexOf("/project/info")==0){ 
        items[items.length]={name:"프로젝트", url:"/project/info/"+$("#project_seq").val()};
        items[items.length]={name:"백로그", url:"/project/backlog"};
        items[items.length]={name:"이슈", url:"/project/issue"};
    }else if(pathname.indexOf("/project")==0){
        items[items.length]={name:"프로젝트", url:"/project"};
    }else if(pathname.indexOf("/issue")==0){
        items[items.length]={name:"나의 미해결 이슈", url:"/issue"};
        items[items.length]={name:"내가 보고함", url:"/issue"};
        items[items.length]={name:"모든 이슈", url:"/issue"};
        items[items.length]={name:"미해결 이슈", url:"/issue"};
        items[items.length]={name:"안료된 이슈", url:"/issue"};
    }else if(pathname.indexOf("/env")==0){
        items[items.length]={name:"사용자", url:"/env/user"};
        items[items.length]={name:"프로젝트", url:"/env/project"};
    }else if(pathname=="/"){
        items[items.length]={name:"Dashboard", url:"/"};
    }
    
    $.each(items, function(index, value){

        var li = document.createElement("li");
        side.append(li);
        li.className="nav-item";

        var alink = document.createElement("a");
        li.append(alink);
        alink.className = "nav-link " + (value.url==pathname?" active ":"");
        alink.href=value.url;
        alink.innerHTML = value.name;
    });
    /*
    for(var i=0;i<items.length;i++){
        var li = document.createElement("li");
        side.append(li);
        li.className="nav-item";

        var alink = document.createElement("a");
        li.append(alink);
        alink.className = "nav-link " + (items[i].url==pathname?" active ":"");
        alink.href=items[i].url;
        alink.innerHTML = items[i].name;
    }
    */
}