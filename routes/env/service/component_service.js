let mysql_dbc = require('../../config/db_conn.js')();
let sqlmap = require('../../sqlmap/env/component_sql.js');

module.exports.insertComponent=function(req, res, callback){
    var user_seq = req.session.userseq;
    var component = req.body.component; 
    component.write_user = user_seq;

    var values=[];
    values[values.length] = component.project_seq;
    values[values.length] = component.component_name;
    values[values.length] = component.component_charge;
    values[values.length] = component.component_desc;
    values[values.length] = component.write_user;

    var connection = mysql_dbc.conn(); 
    mysql_dbc.run(connection, sqlmap.insert(), values, function(err, result) {
        callback(err, result);
        connection.end();
    }, true);
}

module.exports.updateComponent=function(req, res, callback){
    var user_seq = req.session.userseq;
    var component = req.body.component; 
    component.write_user = user_seq;

    var values=[];
    values[values.length] = component.component_name;
    values[values.length] = component.component_charge;
    values[values.length] = component.component_desc;
    values[values.length] = component.write_user;
    values[values.length] = component.component_seq;

    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, sqlmap.update(), values, function(err, result) {
        callback(err, result);
        connection.end();
    }); 
}

module.exports.deleteComponent=function(req, res, callback){
    var user_seq = req.session.userseq;
    var component_seq = req.body.component_seq; 
    
    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, sqlmap.delete(), [component_seq], function(err, result) {
        callback(err, result);
        connection.end();
    }); 
}

module.exports.componentInfo=function(req, res, callback){
    var component_seq = req.body.component_seq; 
    
    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, sqlmap.find(), [component_seq], function(err, rows) {
        callback(err, rows);
        connection.end();
    }); 
}

module.exports.componentList=function(req, res, callback){
    var limit = req.body.limit;
    var page = req.body.page;
    var project_seq = req.body.project_seq; 
    if(page==null){
        page=1;
    }
    if(limit==null){
        limit=10;
    }
    
    var connection = mysql_dbc.conn(); 
    mysql_dbc.run(connection, sqlmap.findList(true), [project_seq], function(err, rows) {
        if(err){
            callback(err, rows);
            connection.end();
        }else{
            var pageInfo = {};
            pageInfo.total_cnt = rows[0].total_cnt;
            pageInfo.page = page;
            pageInfo.limit = limit;
            var offset = limit*(page-1);
            
            mysql_dbc.run(connection, sqlmap.findList(false), [project_seq, limit, offset], function(err, rows) {
                callback(err, rows, pageInfo);
                connection.end();
            }); 
        }
    }); 
}