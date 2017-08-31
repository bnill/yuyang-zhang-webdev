var app = require("../express");

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../public/assignment/uploads' });
app.post("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidgetById(widgetId);
    widget.url = '/assignment/uploads/'+filename;

    var callbackUrl   = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

    res.redirect(callbackUrl);
}

function getWidgetById(wgid) {
    for(var wg in widgets){
        if(widgets[wg]._id === wgid)
            return widgets[wg];
    }
    return null;
}

function deleteWidget(req, res){
    var wgid = req.params.widgetId;
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
}

function updateWidget(req, res) {
    var wgid = req.params.widgetId;
    var widget = req.body;

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
}

function findWidgetById(req, res){
    var result;
    var wgid = req.params.widgetId;
    for(var w in widgets){
        if(widgets[w]._id === wgid){
            result = widgets[w];
            //console.log(result);
            res.send(result);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res){
    var pid = req.params.pageId;
    var widget = req.body;

    var widgetId = (new Date()).getTime() + "";
    widget._id = widgetId;
    widget.pageId = pid;
    widgets.push(widget);
    res.json(widget);
}

function findAllWidgetsForPage(req, res) {
    var pid = req.params.pageId;
    var result_widgets = [];
    for(var w in widgets){
        if(widgets[w].pageId === pid){
            result_widgets.push(widgets[w]);
        }
    }
    res.send(result_widgets);
}