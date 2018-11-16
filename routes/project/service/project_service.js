let mysql_dbc = require('../../config/db_conn.js')();
let sqlmap = require('../../sqlmap/project/project_sql.js');


module.exports.find=function(project_seq, callback){
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

module.exports.componentList=function(req, res, callback){
    var limit = req.body.limit;
    var page = req.body.page;
    var project_seq = req.body.project_seq;
    if(page==null){
        page=1;
    }
    if(limit==null){
        limit=100;
    }
    
    var connection = mysql_dbc.conn(); 
    mysql_dbc.run(connection, sqlmap.findComponentList(true), [project_seq], function(err, rows) {
        if(err){
            callback(err, rows);
            connection.end();
        }else{
            var pageInfo = {};
            pageInfo.total_cnt = rows[0].total_cnt;
            pageInfo.page = page;
            pageInfo.limit = limit;
            var offset = limit*(page-1);
            
            mysql_dbc.run(connection, sqlmap.findComponentList(false), [project_seq, limit, offset], function(err, rows) {
                callback(err, rows, pageInfo);
                connection.end();
            }); 
        }
    }); 
}