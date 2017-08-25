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

        function init(){
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        model.websites_unedited = angular.copy(model.websites);
        model.website_unedited = angular.copy(model.website);

        function deleteWebsiteById(wid){
            websiteService.deleteWebsite(wid);
            //console.log("111");
            $location.url("/user/" + model.userId + "/website");
        }

        function updateWebsite(website){
            if(website.name === ""){
                model.errorMessage = "Website must have a name!"
                return;
            }
            else{
                //console.log(website);
                var result_updateWebsite = websiteService.UpdateWebsite(model.websiteId, website);
                $location.url("/user/" + model.userId + "/website");
            }
        }

        function maintainWebsiteByCog(website, url_id){
            //console.log(website);
            var result_updateWebsite = websiteService.UpdateWebsite(model.websiteId, model.website_unedited);
            $location.url("/user/" + model.userId + "/website/" + url_id);
            return;
        }

        function maintainWebsiteByProfile(website){
            websiteService.UpdateWebsite(website._id, model.website_unedited);
            $location.url("/user/" + model.userId);
        }
    }
})();
