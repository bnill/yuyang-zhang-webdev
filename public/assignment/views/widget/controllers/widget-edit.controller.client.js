(function () {
    angular
        .module("WamApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.wgid = $routeParams.wgid;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;
        model.maintainUneditedWidget = maintainUneditedWidget;
        model.maintainWidgetByProfile = maintainWidgetByProfile;

        function init() {
            model.widget = widgetService.findWidgetsById(model.wgid);
            model.uneditedWidget = angular.copy(model.widget);
        }
        init();

        function deleteWidget(wgid) {
            var result = widgetService.deleteWidget(wgid);
            //console.log(result);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }

        function updateWidget(wid, widget) {
            var result = widgetService.updateWidget(wid, widget);
            //console.log(result);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }

        function maintainUneditedWidget(wgid){
            widgetService.updateWidget(wgid, model.uneditedWidget);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
        }

        function maintainWidgetByProfile(wgid){
            widgetService.updateWidget(wgid, model.uneditedWidget);
            $location.url("/user/" + model.userId);
        }
    }
})();