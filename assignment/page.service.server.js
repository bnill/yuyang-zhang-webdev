var app = require("../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function deletePage(req, res) {
    var pid = req.params.pageId;

    for(var p in pages){
        if(pages[p]._id === pid){
            var result = pages[p];
            var index = pages.indexOf(pages[p]);
            pages.splice(index, 1);
            res.send(result);
            return;
        }
    }
    res.sendStatus(404);
}

function findPageById(req, res) {
    var pid = req.params.pageId;
    for(var p in pages){
        if(pages[p]._id === pid){
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePage(req, res) {
    var pid = req.params.pageId;
    var page = req.body;

    for(var p in pages){
        if(pages[p]._id === pid){
            pages[p] = page;
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res) {
    var wid = req.params.websiteId;
    var page = req.body;

    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.send(page);
}

function findAllPagesForWebsite(req, res) {
    var wid = req.params.websiteId;
    var result_pages = [];
    for(var p in pages){
        if(pages[p].websiteId === wid){
            result_pages.push(pages[p]);
        }
    }
    //console.log(result_pages);
    res.send(result_pages);
}