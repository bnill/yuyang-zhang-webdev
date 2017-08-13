(function(){
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location){
        var model = this;

        model.userId = $routeParams.userId;
        model.addWebsite = addWebsite;

        function init(){
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        function addWebsite(userId, website){
            if(!website){
                model.errorMessage = "Application must have a name and description!";
                return;
            }
            if('name' in website) {
                website.developerId = userId;
                var _website = websiteService.createWebsite(website);
                //console.log(_website);
                $location.url("/user/" + model.userId + "/website");
            }
            else{
                model.errorMessage = "Application must have a name!";
                return;
            }
        }
    }
})();
