var express = require('express');
var router = express.Router();
var projectService = require('./service/project_service.js');

router.get('/', function(req, res, next) {
    var page = "project/project";
    var rsinfo={}
    if(req.session.key){
        //res.locals.session = req.session;
    }else{
        page="login";
    }   
    res.render(page, rsinfo);
});

router.get('/info/:project_seq', function(req, res, next) {
    var page = "project/project_info";
    var rsinfo={}
    if(req.session.key){
        var project_seq = req.params.project_seq;
        projectService.find(project_seq, function(err, rows, pageInfo){
            var info = {}
            if(err){
                rsinfo.data = null; 
            }else{
                rsinfo.data = rows[0];  
            }
            res.render(page, rsinfo);
        });
        //res.locals.session = req.session;
    }else{
        page="login";
        res.render(page, rsinfo);
    }   
});

router.post('/list', function(req, res, next) {
    if(req.session.key){ 
        projectService.projectList(req, res, function(err, rows, pageInfo){
            var info = {}
            if(err){
                info.result = "fail";
                res.status(500).send(info);
            }else{
                if(rows!=null && rows.length>0){
                    rows[0].pageInfo=pageInfo;
                }
                res.status(200).json(rows);
            }
        });
    }else{ 
        res.send("login");
    }   
});

router.post('/component/list', function(req, res, next) {
    if(req.session.key){ 
        projectService.componentList(req, res, function(err, rows, pageInfo){
            var info = {}
            if(err){
                info.result = "fail";
                res.status(500).send(info);
            }else{
                if(rows!=null && rows.length>0){
                    rows[0].pageInfo=pageInfo;
                }
                res.status(200).json(rows);
            }
        });
    }else{ 
        res.send("login");
    }   
});

module.exports = router;
