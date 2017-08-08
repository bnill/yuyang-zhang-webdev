(function(){
    angular
        .module("WamApp")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService, $location){
        var model = this;

        model.userId = $routeParams.userId;
        model.addWebsite = addWebsite;

        function init(){
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function addWebsite(website){
            website.developerId = model.userId;
            var _website = websiteService.addWebsiteForUser(website);
            //console.log(_website);
            $location.url("/user/" + model.userId + "/website");
        }
    }
})();