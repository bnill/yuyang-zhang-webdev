(function(){
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location){
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.deleteWebsite = deleteWebsiteById;

        function init(){
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function deleteWebsiteById(wid){
            websiteService.deleteWebsite(wid);
            //console.log("111");
            $location.url("/user/" + model.userId + "/website");
        }
    }
})();
