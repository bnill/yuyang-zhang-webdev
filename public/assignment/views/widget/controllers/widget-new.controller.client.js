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
            widgetService
                .createWidget(TYPE, model.pid)
                .then(function (widget) {
                    //console.log(widget._id);
                    $location.url('/user/' + model.userId + '/website/' + model.wid + '/page/' + model.pid + '/widget/' + widget._id);
                });
        }
    }
})();