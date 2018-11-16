var mysql = require('mysql');
var config = require('./mysql_config.js').local;
var redisClient = require('./redisclient.js');
module.exports = function () {
    return {
        conn: function () {
            return mysql.createConnection(config);
        },
        run: function(connection, sql, options, callback, isclose){
            console.log(sql) 
            var dtstr = new Date().toISOString();
            redisClient.redisLpush("sql_log", [dtstr+"##"+sql], function(err, results) {
                if(err){
                    console.log(err);
                }
            }); 
            connection.query(sql, options, callback); 
        }
    }
};