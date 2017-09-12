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
widgetModel.sortWidget = sortWidget;

module.exports = widgetModel;

function sortWidget(pageId, start, end) {
    return widgetModel.find({_page: pageId},function(error,widgets){
        //order saves the relative widgetId in the page;
        widgets.forEach(function(widget){
            if(start > end) {
                if(widget.order >= end && widget.order < start) {
                    widget.order++;
                    widget.save();
                } else if(widget.order === start) {
                    widget.order = end;
                    widget.save();
                }
            } else if(start < end){
                if(widget.order > start && widget.order <= end) {
                    widget.order--;
                    widget.save();
                } else if(widget.order === start) {
                    widget.order = end;
                    widget.save();
                }
            }
        });
        return widgets;
    });
}

function deleteWidget(widgetId) {
    return widgetModel
        .findById(widgetId)
        .then(function (deletedWidget) {
            var pageId = deletedWidget._page;
            var order = deletedWidget.order;
            widgetModel
                .find({_page: pageId})
                .then(function (widgets) {
                    widgets.forEach(function(widget){
                        if(widget.order > order){
                            widget.order--;
                            widget.save();
                        }
                    });
                });
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
        .find({_page: pageId})
        .then(function (widgets) {
            widget.order = widgets.length;
            return widgetModel
                .create(widget)
                .then(function (widget) {
                    pageModel
                        .addWidget(pageId, widget._id);
                    return widget;
                });
        });
}