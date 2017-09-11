var app = require("../../express");
var websiteModel = require("../model/website.model.server");

app.delete("/api/website/:websiteId", deleteWebsite);
app.get("/api/user/:userId/website", findWebsitesForUser);
app.get("/api/user/:userId/website/:wid", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);

function deleteWebsite(req, res){
    var wid = req.params.websiteId;

    websiteModel
        .deleteWebsite(wid)
        .then(function (status) {
            res.send(status);
        })
    /*
    for(var w in websites){
        if(websites[w]._id === wid){
            var index = websites.indexOf(websites[w]);
            websites.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function updateWebsite(req, res) {
    var wid = req.params.websiteId;
    var website = req.body;

    websiteModel
        .updateWebsite(wid, website)
        .then(function (status) {
            res.send(status);
        })
    /*
    for(var w in websites) {
        if(websites[w]._id === wid){
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function findWebsiteById(req, res){
    var wid = req.params.wid;
    var sent = false;

    websiteModel
        .findWebsiteById(wid)
        .then(function (website) {
            res.send(website);
            return;
        });

    /*
    for(var w in websites){
        if(websites[w]._id === wid){
            var result = websites[w];
            res.json(result);
            sent = true;
        }
    }
    if(sent === false)
        res.sendStatus(404);
    */
}

function createWebsite(req, res){
    var userId = req.params.userId;
    var website = req.body;

    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.send(website);
        });
    /*
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.send(website);
    */
}

function findWebsitesForUser(req, res) {
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.send(websites);
            return;
        })
    /*
    var sites = [];
    for(var w in websites){
        if(websites[w].developerId === userId){
            sites.push(websites[w]);
        }
    }
    res.send(sites);
    */
}