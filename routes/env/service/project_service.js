let mysql_dbc = require('../../config/db_conn.js')();
let sqlmap = require('../../sqlmap/env/project_sql.js');

module.exports.insertProject=function(req, res, callback){
    var user_seq = req.session.userseq;
    var project_name = req.body.project_name; 
 
    var connection = mysql_dbc.conn(); 
    mysql_dbc.run(connection, sqlmap.insert(), [project_name, user_seq], function(err, result) {
        callback(err, result);
        connection.end();
    }, true);
}

module.exports.updateProject=function(req, res, callback){
    var user_seq = req.session.userseq;
    var project_seq = req.body.project_seq; 
    var project_name = req.body.project_name;  
    
    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, sqlmap.update(), [project_name, user_seq, project_seq], function(err, result) {
        callback(err, result);
        connection.end();
    }); 
}

module.exports.deleteProject=function(req, res, callback){
    var user_seq = req.session.userseq;
    var project_seq = req.body.project_seq; 
    
    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, sqlmap.delete(), [project_seq], function(err, result) {
        callback(err, result);
        connection.end();
    }); 
}

module.exports.projectInfo=function(req, res, callback){
    var project_seq = req.body.project_seq; 
    
    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, sqlmap.find(), [project_seq], function(err, rows) {
        callback(err, rows);
        connection.end();
    }); 
}

module.exports.projectList=function(req, res, callback){
    var limit = req.body.limit;
    var page = req.body.page;
    if(page==null){
        page=1;
    }
    if(limit==null){
        limit=10;
    }
    
    var connection = mysql_dbc.conn(); 
    mysql_dbc.run(connection, sqlmap.findList(true), [], function(err, rows) {
        if(err){
            callback(err, rows);
            connection.end();
        }else{
            var pageInfo = {};
            pageInfo.total_cnt = rows[0].total_cnt;
            pageInfo.page = page;
            pageInfo.limit = limit;
            var offset = limit*(page-1);
            
            mysql_dbc.run(connection, sqlmap.findList(false), [limit, offset], function(err, rows) {
                callback(err, rows, pageInfo);
                connection.end();
            }); 
        }
    }); 
}