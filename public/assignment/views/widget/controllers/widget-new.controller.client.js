(function () {
    angular
        .module("WamApp")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.createWidget = createWidget;

        function init() {

        }
        init();

        function createWidget(TYPE) {
            var widgetId = widgetService.createWidget(TYPE, model.pid);
            //console.log(widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widgetId);
        }
    }
})();