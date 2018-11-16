var express = require('express');
var router = express.Router();
var projectService = require('./service/project_service.js');
var componentService = require('./service/component_service.js');

router.get('/project', function(req, res, next) {
    var page = "env/project";
    var rsinfo={}
    if(req.session.key){ 
    }else{
        page="login";
    }   
    res.render(page, rsinfo);
});

router.post('/project/list', function(req, res, next) {
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

router.post('/project/insert', function(req, res, next) {
    if(req.session.key){ 
        projectService.insertProject(req, res, function(err, result){
            var info = {}
            if(err){
                info.result = "fail";
                res.status(500).send(info);
            }else{
                info.result = "success";
                info.project_seq = result.insertId;
                res.status(200).json(info);
            }
        });
    }else{ 
        res.send("login");
    }   
});

router.post('/project/update', function(req, res, next) {
    if(req.session.key){ 
        projectService.updateProject(req, res, function(err, result){
            var info = {}
            if(err){
                info.result = "fail";
                res.status(500).send(info);
            }else{
                info.result = "success";
                res.status(200).json(info);
            }
        });
    }else{ 
        res.send("login");
    }   
});

router.post('/project/delete', function(req, res, next) {
    if(req.session.key){ 
        projectService.deleteProject(req, res, function(err, result){
            var info = {}
            if(err){
                info.result = "fail";
                res.status(500).send(info);
            }else{
                info.result = "success";
                res.status(200).json(info);
            }
        });
    }else{ 
        res.send("login");
    }   
});

router.post('/project/component/list', function(req, res, next) {
    if(req.session.key){ 
        componentService.componentList(req, res, function(err, rows, pageInfo){
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

router.post('/project/component/modify', function(req, res, next) {
    if(req.session.key){ 
        var component = req.body.component; 
        console.log(component);
        if(component!=null){
            if(component.component_seq!=""){
                componentService.updateComponent(req, res, function(err, result){
                    var info = {}
                    if(err){
                        info.result = "fail";
                        res.status(500).send(info);
                    }else{
                        info.result = "success";
                        res.status(200).json(info);
                    }
                });
            }else{
                componentService.insertComponent(req, res, function(err, result){
                    var info = {}
                    if(err){
                        info.result = "fail";
                        res.status(500).send(info);
                    }else{
                        info.result = "success";
                        info.component_seq = result.insertId;
                        res.status(200).json(info);
                    }
                });
            }
        }else{
            var info = {}
            info.result = "fail";
            res.status(500).send(info);
        }
    }else{ 
        res.send("login");
    }   
});

router.post('/project/component/delete', function(req, res, next) {
    if(req.session.key){ 
        componentService.deleteComponent(req, res, function(err, result){
            var info = {}
            if(err){
                info.result = "fail";
                res.status(500).send(info);
            }else{
                info.result = "success";
                res.status(200).json(info);
            }
        });
    }else{ 
        res.send("login");
    }   
});

module.exports = router;
