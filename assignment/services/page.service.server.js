var app = require("../../express");
var pageModel = require("../model/page.model.server");

app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

function deletePage(req, res) {
    var pid = req.params.pageId;

    pageModel
        .deletePage(pid)
        .then(function (status) {
            res.send(status);
            return;
        })
    /*
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
    */
}

function findPageById(req, res) {
    var pid = req.params.pageId;

    pageModel
        .findPageById(pid)
        .then(function (page) {
           res.send(page);
           return;
        });
    /*
    for(var p in pages){
        if(pages[p]._id === pid){
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function updatePage(req, res) {
    var pid = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pid, page)
        .then(function (status) {
            res.send(status);
            return;
        })
    /*
    for(var p in pages){
        if(pages[p]._id === pid){
            pages[p] = page;
            res.send(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function createPage(req, res) {
    var wid = req.params.websiteId;
    var page = req.body;

    pageModel
        .createPage(wid, page)
        .then(function (page) {
            res.send(page);
            return;
        })
    /*
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.send(page);
    */
}

function findAllPagesForWebsite(req, res) {
    var wid = req.params.websiteId;

    pageModel
        .findAllPagesForWebsite(wid)
        .then(function (pages) {
            res.send(pages);
            return;
        })
    /*
    var result_pages = [];
    for(var p in pages){
        if(pages[p].websiteId === wid){
            result_pages.push(pages[p]);
        }
    }
    */
    //console.log(result_pages);
    //res.send(result_pages);
}