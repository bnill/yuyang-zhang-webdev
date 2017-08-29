(function(){
    angular
        .module("WamApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, websiteService, $location){
        var model = this;

        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.wid;
        model.deleteWebsite = deleteWebsiteById;
        model.updateWebsite = updateWebsite;
        model.maintainWebsiteByCog = maintainWebsiteByCog;
        model.maintainWebsiteByProfile = maintainWebsiteByProfile;
        model.maintainWebsiteByBack = maintainWebsiteByBack;

        function init(){
            websiteService
                .findWebsitesForUser(model.userId)
                .then(function (websites) {
                    model.websites = websites;
                    model.websites_unedited = angular.copy(model.websites);
                });
            websiteService
                .findWebsiteById(model.websiteId, model.userId)
                .then(function (website) {
                    model.website = website;
                    model.website_unedited = angular.copy(model.website);
                });
        }
        init();

        function deleteWebsiteById(wid){
            websiteService
                .deleteWebsite(wid)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })
            //console.log("111");
        }

        function updateWebsite(website){
            if(website.name === ""){
                model.errorMessage = "Website must have a name!"
                return;
            }
            else{
                //console.log(website);
                websiteService
                    .UpdateWebsite(model.websiteId, website)
                    .then(function () {
                        $location.url("/user/" + model.userId + "/website");
                    });
            }
        }

        function maintainWebsiteByCog(website, url_id){
            //console.log(website);
            websiteService
                .UpdateWebsite(model.websiteId, model.website_unedited)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + url_id);
                });
        }

        function maintainWebsiteByProfile(website){
            websiteService
                .UpdateWebsite(website._id, model.website_unedited)
                .then(function () {
                    $location.url("/user/" + model.userId);
                });
        }

        function maintainWebsiteByBack(website){
            websiteService
                .UpdateWebsite(model.websiteId, model.website_unedited)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website");
                })
        }
    }
})();
