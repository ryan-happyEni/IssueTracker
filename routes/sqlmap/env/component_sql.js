
module.exports.insert=function(){
    var sql ="";
    sql = "insert into component (project_seq, component_name, component_charge, component_desc, write_user, write_date) values(?, ?, ?, ?, ?, now())";

    return sql;
}

module.exports.update=function(){
    var sql ="";
    sql = "update component set component_name=?, component_charge=?, component_desc=?, write_user=?, write_date=now() where component_seq=? ";

    return sql;
}

module.exports.delete=function(){
    var sql ="";
    sql = "delete from component where component_seq=? ";

    return sql;
}

module.exports.findList=function(iscount){
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

module.exports.find=function(){
    var sql ="";
    sql += "select ";
    sql += "    project_seq, component_seq, component_name, component_charge, component_desc, write_user, write_date ";
    sql += "from component ";
    sql += "where component_seq = ? ";

    return sql;
}