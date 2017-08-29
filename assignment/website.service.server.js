var app = require("../express");

app.delete("/api/website/:websiteId", deleteWebsite);
app.get("/api/user/:userId/website", findWebsitesForUser);
app.get("/api/user/:userId/website/:wid", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function deleteWebsite(req, res){
    var wid = req.params.websiteId;

    for(var w in websites){
        if(websites[w]._id === wid){
            var index = websites.indexOf(websites[w]);
            websites.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    //var index = websites.indexOf(result);
    //websites.splice(index, 1);
    //res.send()
}

function updateWebsite(req, res) {
    var wid = req.params.websiteId;
    var website = req.body;

    for(var w in websites) {
        if(websites[w]._id === wid){
            websites[w].name = website.name;
            websites[w].description = website.description;
            res.send(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findWebsiteById(req, res){
    var wid = req.params.wid;
    var sent = false;
    for(var w in websites){
        if(websites[w]._id === wid){
            var result = websites[w];
            res.json(result);
            sent = true;
        }
    }
    if(sent === false)
        res.sendStatus(404);
}

function createWebsite(req, res){
    var userId = req.params.userId;
    var website = req.body;

    website._id = (new Date()).getTime() + "";
    websites.push(website);
    res.send(website);
}

function findWebsitesForUser(req, res) {
    var userId = req.params.userId;
    var sites = [];
    for(var w in websites){
        if(websites[w].developerId === userId){
            sites.push(websites[w]);
        }
    }
    res.send(sites);
}