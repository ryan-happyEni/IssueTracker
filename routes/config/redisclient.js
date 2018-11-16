var redisconfig   = require('./redis_config.js').run;
let
    redis     = require('redis'),    
    redisClient    = redis.createClient(redisconfig); 

module.exports.client=function(){
    return redisClient;
}

module.exports.redisInfo=function(callback){
    redisClient.info(callback);     
}

module.exports.redisKeys=function(search, callback){
    redisClient.keys(search, callback);     
}

module.exports.redisKeyInfo=function(search, callback){  
    redisClient.type(search, callback);
}

module.exports.redisExists=function(key, callback){
    redisClient.exists(key, callback);
}

module.exports.redisDel=function(key, callback){
    redisClient.del(key, callback);
}

module.exports.redisHdel=function(key, field, callback){
    redisClient.hdel(key, field, callback);
}

module.exports.redisSrem=function(key, value, callback){
    redisClient.srem(key, value, callback); 
}

module.exports.redisZrem=function(key, value, callback){
    redisClient.zrem(key, value, callback); 
}

module.exports.redisLrem=function(key, value, count, callback){ 
    redisClient.lrem(key, count, value, callback);     
}

module.exports.redisSet=function(expireSeconds, key, value, callback){
    if(expireSeconds!=null && expireSeconds>0){
        redisClient.setex(key, expireSeconds, value, callback);
    }else{
        redisClient.set(key, value, callback);
    }
}

module.exports.redisGet=function(key, callback){
    redisClient.get(key, callback);
} 

module.exports.redisHMSet=function(key, obj, callback){  
    try{ 
        redisClient.hmset(key, obj, callback); 
    }catch(e){
        callback(null);
    }
} 

module.exports.redisHGetall=function(key, callback){
    try{ 
        redisClient.hgetall(key, callback);
    }catch(e){
        callback(null);
    }
} 

module.exports.redisLpush=function(key, arr, callback){
    try{ 
        if(arr!=null && arr.length>0){
            var multi = redisClient.multi();
            for(var i=0; i<arr.length; i++){
                multi.lpush(key, arr[i]);
            }
            multi.exec(callback);
        } 
    }catch(e){
        callback(null);
    }
} 

module.exports.redisRpush=function(key, arr, callback){
    try{ 
        if(arr!=null && arr.length>0){
            var multi = redisClient.multi();
            for(var i=0; i<arr.length; i++){
                multi.rpush(key, arr[i]);
            }
            multi.exec(callback);
        } 
    }catch(e){
        callback(null);
    }
} 

module.exports.redisLrange=function(key, start, end, callback){
    try{ 
        redisClient.lrange(key, start, end, callback);
    }catch(e){
        callback(null);
    }
} 

module.exports.redisSadd=function(key, arr, callback){
    try{ 
        if(arr!=null && arr.length>0){
            var multi = redisClient.multi();
            for(var i=0; i<arr.length; i++){
                multi.sadd(key, arr[i]);
            }
            multi.exec(callback);
        } 
    }catch(e){
        callback(null);
    }
} 

module.exports.redisSmembers=function(key, callback){
    try{ 
        redisClient.smembers(key, callback);
    }catch(e){
        callback(null);
    }
} 

module.exports.redisZadd=function(key, arr, callback){
    try{ 
        if(arr!=null && arr.length>0){
            var multi = redisClient.multi();
            for(var i=0; i<arr.length; i++){
                //multi.zadd(key, arr[i].priority, JSON.stringify(arr[i].value));
                console.log(arr[i])
                multi.zadd(key, arr[i].priority, arr[i].value);
            }
            multi.exec(callback);
        } 
    }catch(e){
        callback(null);
    }
} 

module.exports.redisZrange=function(key, start, end, callback){
    try{ 
        redisClient.zrange(key, start, end, callback);
    }catch(e){
        callback(null);
    }
} 

module.exports.redisZcard=function(key, callback){
    try{ 
        redisClient.zcard(key, callback);
    }catch(e){
        callback(0); 
    }
} 

module.exports.redisScard=function(key, callback){
    try{  
        redisClient.scard(key, callback);
    }catch(e){
        callback(0); 
    }
} 

module.exports.redisLlen=function(key, callback){
    try{  
        redisClient.llen(key, callback); 
    }catch(e){
        callback(0); 
    }
} 

module.exports.redisHlen=function(key, callback){
    try{  
        redisClient.hlen(key, callback);  
    }catch(e){
        callback(0); 
    }
} 

module.exports.redisKeycount=function(key, callback){
    try{  
        redisClient.ZSCAN
        redisClient.hlen(key, callback);  
    }catch(e){
        callback(0); 
    }
} 