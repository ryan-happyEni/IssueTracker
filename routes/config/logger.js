
var redisClient = require('./redisclient.js');

module.exports.debug = function (obj) {
    var str = obj instanceof Object ? JSON.stringify(obj):obj;
    redisClient.redisLpush("log/debug", [str], function(err, results) {
        if(err){
            console.log(err);
        }
    }); 
};

module.exports.info = function (obj) {
    var str = obj instanceof Object ? JSON.stringify(obj):obj;
    redisClient.redisLpush("log/info", [str], function(err, results) {
        if(err){
            console.log(err);
        }
    }); 
};

module.exports.error = function (err, str) {
    var errstr = JSON.stringify(err);
    redisClient.redisLpush("log/error", [errstr, str], function(err, results) {
        if(err){
            console.log(err);
        }
    }); 
};

module.exports.custom = function (key, obj) {
    var str = obj instanceof Object ? JSON.stringify(obj):obj;
    redisClient.redisLpush(key, [str], function(err, results) {
        if(err){
            console.log(err);
        }
    }); 
};