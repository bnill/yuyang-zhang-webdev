var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("./database");
var widgetModel = mongoose.model('widgetModel', widgetSchema);
var pageModel = require("./page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.updateWidget = updateWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (widget) {
            var pageId = widget._page;
            return pageModel
                .deleteWidget(pageId, widgetId)
                .then(function () {
                    return widgetModel
                        .remove({_id: widgetId});
                })
        })
}

function findWidgetById(widgetId) {
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId, widget) {
    return widgetModel
        .update({_id: widgetId}, {$set: widget});
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId});
}

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel
        .create(widget)
        .then(function (widget) {
            pageModel
                .addWidget(pageId, widget._id);
            return widget;
        })
}