
module.exports.insert=function(){
    var sql ="";
    sql = "insert into project (project_name, write_user, write_date) values(?, ?, now())";

    return sql;
}

module.exports.update=function(){
    var sql ="";
    sql = "update project set project_name=?, write_user=?, write_date=now() where project_seq=? ";

    return sql;
}

module.exports.delete=function(){
    var sql ="";
    sql = "delete from project where project_seq=? ";

    return sql;
}

module.exports.findList=function(iscount){
    var columns = " count(project_seq) total_cnt ";
    
    if(!iscount){
        columns = "";
        columns += "    project_seq, project_name, write_user, write_date ";
    }

    var sql ="";
    sql += "select ";
    sql += columns;
    sql += "from project ";
    if(!iscount){
        sql += "order by project_name ";
        sql += "limit ? ";
        sql += "offset ? ";
    }
    return sql;
}

module.exports.find=function(){
    var sql ="";
    sql += "select ";
    sql += "    project_seq, project_name, write_user, write_date ";
    sql += "from project ";
    sql += "where project_seq = ? ";

    return sql;
}