var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var page = "issue/issue";
    var rsinfo={}
    if(req.session.key){
        //res.locals.session = req.session;
    }else{
        page="login";
    }   
    res.render(page, rsinfo);
});

module.exports = router;
