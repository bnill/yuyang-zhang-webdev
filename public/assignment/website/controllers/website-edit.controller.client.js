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
        model.updateWebsiteByCog = updateWebsiteByCog;

        function init(){
            model.website = websiteService.findWebsiteById(model.websiteId);
            model.websites = websiteService.findWebsitesForUser(model.userId);
        }
        init();

        model.websites_unedited = angular.copy(model.websites);

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

        function updateWebsiteByCog(website, url_id){
            if(website.name === ""){
                model.errorMessage = "Website must have a name!"
                return;
            }
            else{
                //console.log(website);
                var result_updateWebsite = websiteService.UpdateWebsite(model.websiteId, website);
                $location.url("/user/" + model.userId + "/website/" + url_id);
                return;
            }
        }
    }
})();
