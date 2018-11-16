var express = require('express');
var router = express.Router();
var session = require('express-session');
const crypto = require('crypto');
let mysql_dbc = require('./config/db_conn.js')();

router.get('/', function(req, res, next) {
    var page = "index";
    var rsinfo={}
    if(req.session && req.session.key){
        //res.locals.session = req.session;
    }else{
        page="login";
    }   
    res.render(page, rsinfo);
});

router.get('/login', function(req, res, next) {
    res.render("login");
});

router.post('/login', function(req, res, next) {
    var user_id = req.body.userid;
    var user_pass = req.body.userpass;    
    
    var connection = mysql_dbc.conn();
    mysql_dbc.run(connection, 'select * from user where user_id=? ', [user_id], function(err, rows) {
        connection.end();
        if(err) throw err;

        if(rows!=null && rows.length>0){
            var info = rows[0];
            crypto.pbkdf2(user_pass, info.salt_key, 100000, 64, 'sha512', (err, key) => {
                if(key.toString('base64')===info.user_pass){
                    req.session.key = info.user_seq
                    req.session.name = info.user_name
                    req.session.userid = info.user_id
                    req.session.userseq = info.user_seq
                }
                res.redirect('/');
            });
        }else{
            res.redirect('/');
        }
    }); 
});


router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err){
        if(err){
            console.log('session is not destory.');
            res.redirect('/');
        }else{
            console.log('session is destory.');
            res.redirect('/');
        }
    });
});

router.post('/join', function(req, res, next) {
    var user_id = req.body.userid;
    var user_pass = req.body.userpass;    
    var salt_key="";

    crypto.randomBytes(64, (err, buf) => {
        salt_key = buf.toString('base64');
        crypto.pbkdf2(user_pass, salt_key, 100000, 64, 'sha512', (err, key) => {
            user_pass=key.toString('base64');    

            var sql = "";
            sql = "insert into user (user_id, user_name, user_pass, salt_key, write_date) values(?, ?, ?, ?, now())";
            
            var connection = mysql_dbc.conn();
            mysql_dbc.run(connection, sql, [user_id, user_id, user_pass, salt_key], function(err, rows) {
                connection.end();
                if(err) throw err;

                res.redirect('/');
            }); 
        });
    });
    
    
});

module.exports = router;
