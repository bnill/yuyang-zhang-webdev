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

        function createWidget(){

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
        
        function findWidgetsById() {
            
        }

        function updateWidget(){

        }

        function deleteWidget(){

        }

    }
})();
