(function () {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);
    
    function widgetService() {
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

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetsById": findWidgetsById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        }

        return api;

        function createWidget(TYPE, pid){
            var widgetId = (new Date()).getTime() + "";
            switch(TYPE){
                case 'HEADING':
                    var widget = { "_id": "", "widgetType": "HEADING", "pageId": "", "size": "" , "text": ""};
                    break;
                case 'HTML':
                    var widget = { "_id": "", "widgetType": "HTML", "pageId": "", "text": ""};
                    break;
                case 'IMAGE':
                    var widget = { "_id": "", "widgetType": "IMAGE", "pageId": "", "width": "" , "url": ""};
                    break;
                case 'YOUTUBE':
                    var widget = { "_id": "", "widgetType": "YOUTUBE", "pageId": "", "width": "" , "url": ""};
                    break;
                default:
                    break;
            }
            widget._id = widgetId;
            widget.pageId = pid;
            //console.log(widget);
            widgets.push(widget);
            return widgetId;
        }

        function findWidgetsByPageId(pid){
            var result_widgets = [];
            for(var w in widgets){
                if(widgets[w].pageId === pid){
                    result_widgets.push(widgets[w]);
                }
            }
            return result_widgets;

        }
        
        function findWidgetsById(wgid) {
            var result;
            for(var w in widgets){
                if(widgets[w]._id === wgid){
                    result = widgets[w];
                    //console.log(result);
                    return result;
                }
            }
            return;
        }

        function updateWidget(wgid, widget){
            var result;
            for(var w in widgets){
                if(widgets[w]._id === wgid){
                    //console.log(widgets[w]);
                    widgets[w] = widget;
                    result = widgets[w];
                    //console.log(widgets[w])
                }
            }
            return result;
        }

        function deleteWidget(wgid){
            var result = findWidgetsById(wgid);
            var index = widgets.indexOf(result);
            widgets.splice(index, 1);
            //console.log(widgets);
            return widgets;
        }

    }
})();
