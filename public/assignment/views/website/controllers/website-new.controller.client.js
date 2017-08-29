(function(){
    angular
        .module("WamApp")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($routeParams, websiteService, $location){
        var model = this;

        model.userId = $routeParams.userId;
        model.addWebsite = addWebsite;

        function init(){
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                });
        }
        init();

        function addWebsite(userId, website){
            if(!website){
                model.errorMessage = "Application must have a name and description!";
                return;
            }
            if(!('name' in website)){
                model.errorMessage = "Application must have a name!";
                return;
            }
            else{
                website.developerId = userId;
                websiteService
                    .createWebsite(website)
                    .then(function () {
                        $location.url("/user/" + model.userId + "/website");
                    });
            }
        }
    }
})();
