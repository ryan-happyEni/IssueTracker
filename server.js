var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser'); 
var session = require('express-session');
var logger = require('./routes/config/logger.js');
var redisStore = require('connect-redis')(session);
var redisconfig   = require('./routes/config/redis_config.js').run;
let redis = require('redis'),    
    redisClient = redis.createClient(redisconfig); 

var indexRouter = require('./routes/index');
var projectRouter = require('./routes/project/project');
var envRouter = require('./routes/env/env');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));   

app.use(session({
    store: new redisStore({
        client:redisClient,
        ttl:260   
    }),
    secret: 'keyboardsecretkey',
    saveUninitialized:false,
    resave:false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    

    var dtstr = new Date().toISOString();
    var accept={}
    accept["path"] = req.path;
    accept["datetime"] = dtstr;
    accept["user-agent"] = req.headers["user-agent"];
    accept["accept"] = req.headers.accept;
    accept["accept-language"] = req.headers["accept-language"]; 
    
    var session = {};
    if(req.session && req.session.key){
        session.key = req.session.key;
        session.name = req.session.name;
        session.userid = req.session.userid;
        accept["userid"] = req.session.userid;
    }
    logger.info(accept);
    logger.custom("call_url", accept.path+"###"+dtstr);

    res.locals.session=session;
    
    next();
});

app.use('/', indexRouter); 
app.use('/project', projectRouter); 
app.use('/env', envRouter); 




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var server = app.listen(8080, function () {
    console.log('Dev app listening on port 8080!');
});