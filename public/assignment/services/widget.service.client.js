(function () {
    angular
        .module("WamApp")
        .factory("widgetService", widgetService);
    
    function widgetService($routeParams ,$http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetsById": findWidgetsById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "sortWidget": sortWidget
        }

        return api;

        function createWidget(TYPE, pid){
            var url = "/api/page/" + pid + "/widget";
            switch(TYPE){
                case 'HEADING':
                    var widget = { "type": "HEADING", "size": "" , "text": ""};
                    break;
                case 'HTML':
                    var widget = { "type": "HTML", "text": "", "colsize": "col-xs-12"};
                    break;
                case 'IMAGE':
                    var widget = { "type": "IMAGE", "width": "" , "url": ""};
                    break;
                case 'YOUTUBE':
                    var widget = { "type": "YOUTUBE", "width": "100%", "height": "562.5" , "url": ""};
                    break;
                case 'TEXT':
                    var widget = { "type": "TEXT", "text": ""};
                    //console.log(widget);
                    break;
                case 'LABEL':
                    var widget = { "type": "LABEL", "text": ""};
                    break;
                case 'LINK':
                    var widget = { "type": "LINK", "url": ""};
                    break;
                case 'BUTTON':
                    var widget = { "type": "BUTTON", "text": "", "class": ""};
                    break;
                default:
                    break;
            }
            //console.log(widget);
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetsByPageId(pid){
            var url = "/api/page/" + pid + "/widget";
            return $http.get(url)
                .then(function (response) {
                    var result = response.data;
                    return result;
                });
            /*
            var result_widgets = [];
            for(var w in widgets){
                if(widgets[w].pageId === pid){
                    result_widgets.push(widgets[w]);
                }
            }
            return result_widgets;
            */
        }
        
        function findWidgetsById(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*
            var result;
            for(var w in widgets){
                if(widgets[w]._id === wgid){
                    result = widgets[w];
                    //console.log(result);
                    return result;
                }
            }
            return;
            */
        }

        function updateWidget(wgid, widget){
            var url = "/api/widget/" + wgid;
            //console.log(widget);
            return $http.put(url, widget);
            /*
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
            */
        }

        function deleteWidget(wgid){
            var url = "/api/widget/" + wgid;
            return $http.delete(url);
            /*
            var result = findWidgetsById(wgid);
            var index = widgets.indexOf(result);
            widgets.splice(index, 1);
            //console.log(widgets);
            return widgets;
            */
        }

        function sortWidget(start, end) {
            var url = "/api/page/" + $routeParams.pid + "/widget?initial=" + start + "&final=" + end;
            //console.log(url);
            return $http.put(url);
        }

    }
})();
