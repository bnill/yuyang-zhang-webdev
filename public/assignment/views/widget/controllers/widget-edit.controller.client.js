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
            widgetService
                .findWidgetsById(model.wgid)
                .then(function (widget) {
                    model.widget = widget;
                    model.uneditedWidget = angular.copy(model.widget);
                });
        }
        init();

        function deleteWidget(wgid) {
            widgetService
                .deleteWidget(wgid)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
            //console.log(result);
        }

        function updateWidget(wgid, widget) {
            if(model.widget.text === "" && model.widget.type === "HEADING"){
                model.errorMessage = "The text for header cannot be empty!";
                return;
            }
            if(model.widget.type === "HEADING" && (model.widget.size > 6 || model.widget.size < 1)){
                model.errorMessage = "The size of the header should be between 1 and 6";
                return;
        }
            widgetService
                .updateWidget(wgid, widget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                }, function () {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
            //console.log(result);
        }

        function maintainUneditedWidget(wgid){
            widgetService
                .updateWidget(wgid, model.uneditedWidget)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page/" + model.pid + "/widget");
                });
        }

        function maintainWidgetByProfile(wgid){
            widgetService
                .updateWidget(wgid, model.uneditedWidget)
                .then(function () {
                    $location.url("/user/" + model.userId);
                });
        }
    }
})();