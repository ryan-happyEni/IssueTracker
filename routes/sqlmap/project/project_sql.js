
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

module.exports.findComponentList=function(iscount){
    var columns = " count(component_seq) total_cnt ";
    
    if(!iscount){
        columns = "";
        columns += "    project_seq, component_seq, component_name, component_charge, component_desc, write_user, write_date ";
    }

    var sql ="";
    sql += "select ";
    sql += columns;
    sql += "from component ";
    sql += "where project_seq = ? ";
    if(!iscount){
        sql += "order by component_name ";
        sql += "limit ? ";
        sql += "offset ? ";
    }
    return sql;
}