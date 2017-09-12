var app = require("../../express");
var widgetModel = require("../model/widget.model.server");

app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.put("/api/page/:pageId/widget", sortWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function sortWidget(req, res) {
    var pid = req.params.pageId;
    var start = parseInt(req.query.initial);
    var end = parseInt(req.query.final);

    widgetModel
        .sortWidget(pid, start, end)
        .then(function (widgets) {
            widgets.sort(function (a, b) {
               return a.order - b.order;
            });
            //console.log(widgets);
            res.send(widgets);
        });

    /*
    var widgetsTmp = [];
    var length = widgets.length;
    for (var i =  length - 1; i >= 0; i--){
        if (widgets[i].pageId === pid){
            widgetsTmp.unshift(widgets[i]);
            widgets.splice(i, 1);
        }
    }
    var widget = widgetsTmp[start];
    widgetsTmp.splice(start, 1);
    widgetsTmp.splice(end, 0, widget);
    widgets = widgets.concat(widgetsTmp);
    res.sendStatus(200);
    */
}

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });
app.post("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if(req.file) {
        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                widget.url = '/assignment/uploads/' + filename;
                widgetModel.updateWidget(widgetId, widget)
                    .then(function (widget) {
                        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
                        res.redirect(callbackUrl);
                    });
            });

    }
    else {
        var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId;
        res.redirect(callbackUrl);
    }
}

function deleteWidget(req, res){
    var wgid = req.params.widgetId;

    widgetModel
        .deleteWidget(wgid)
        .then(function (status) {
            res.send(status);
        })
    /*
    for(var wg in widgets){
        if(widgets[wg]._id === wgid){
            var result = widgets[wg];
            var index = widgets.indexOf(result);
            widgets.splice(index, 1);
            res.send(result);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function updateWidget(req, res) {
    var wgid = req.params.widgetId;
    var widget = req.body;

    widgetModel
        .updateWidget(wgid, widget)
        .then(function (status) {
            res.send(status);
        })
    /*
    var result;
    for(var w in widgets){
        if(widgets[w]._id === wgid){
            //console.log(widgets[w]);
            widgets[w] = widget;
            result = widgets[w];
            res.send(result);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function findWidgetById(req, res){
    var wgid = req.params.widgetId;

    widgetModel
        .findWidgetById(wgid)
        .then(function (widget) {
            res.send(widget);
            return;
        })
    /*
    for(var w in widgets){
        if(widgets[w]._id === wgid){
            result = widgets[w];
            //console.log(result);
            res.send(result);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function createWidget(req, res){
    var pid = req.params.pageId;
    var widget = req.body;

    widgetModel
        .createWidget(pid, widget)
        .then(function (widget) {
            res.send(widget);
        });
    /*
    var widgetId = (new Date()).getTime() + "";
    widget._id = widgetId;
    widget.pageId = pid;
    widgets.push(widget);
    res.json(widget);
    */
}

function findAllWidgetsForPage(req, res) {
    var pid = req.params.pageId;

    widgetModel
        .findAllWidgetsForPage(pid)
        .then(function (widgets) {
            widgets.sort(function (a, b) {
               return a.order - b.order;
            });
            res.send(widgets);
            return;
        })
    /*
    var result_widgets = [];
    for(var w in widgets){
        if(widgets[w].pageId === pid){
            result_widgets.push(widgets[w]);
        }
    }
    res.send(result_widgets);
    */
}