(function () {
    angular
        .module("WamApp")
        .controller("widgetListController", widgetListController);

    function widgetListController($routeParams, widgetService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;

        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pid);
            //console.log(model.widgets);
        }
        init();
    }
})();