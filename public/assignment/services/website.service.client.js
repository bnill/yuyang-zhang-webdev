(function(){
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService($http){

        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "findWebsiteById":findWebsiteById,
            "UpdateWebsite": UpdateWebsite,
            "deleteWebsite": deleteWebsite
        }

        return api;

        function findWebsitesForUser(userId){
            var url = "/api/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    var sites = response.data;
                    return sites;
                });
        }
        
        function createWebsite(website) {
            var url = "/api/user/" + website.developerId + "/website";
            return $http.post(url, website);
            /*
            website._id = (new Date()).getTime() + "";
            websites.push(website);
            return website;
            */
        }

        function findWebsiteById(wid, userId){
            var url = "/api/user/" + userId + "/website/" + wid;
            return $http.get(url)
                .then(function (response) {
                    var site = response.data;
                    return site;
                });
            /*
            for(w in websites){
                if(websites[w]._id === wid){
                    var result = websites[w];
                    //console.log(result);
                    return result;
                }
            }
            return null;
            */
        }

        function deleteWebsite(wid){
            var url = "/api/website/" + wid;
            return $http.delete(url);

            /*
            var result = findWebsiteById(wid);
            var index = websites.indexOf(result);
            websites.splice(index, 1);
            return;
            */
            //console.log("111");
        }

        function UpdateWebsite(wid, website) {
            var url = "/api/website/" + wid;
            return $http.put(url, website);
            /*
            for(w in websites) {
                if(websites[w]._id === wid){
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
            return;
            */
        }
    }
})();
