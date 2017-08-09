(function(){
    angular
        .module("WamApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;

        function init(){
            model.pages = pageService.findPageByWebsiteId(model.wid);
        }
        init();
    }
})();