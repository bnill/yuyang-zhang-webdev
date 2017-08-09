(function(){
    angular
        .module("WamApp")
        .factory("websiteService", websiteService);

    function websiteService(){

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        //this.findWebsitesForUser = findWebsitesForUser;
        var api = {
            "findWebsitesForUser": findWebsitesForUser,
            "createWebsite": createWebsite,
            "findWebsiteById":findWebsiteById,
            "UpdateWebsite": UpdateWebsite,
            "deleteWebsite": deleteWebsite
        }

        return api;

        function findWebsitesForUser(userId){
            var sites = [];
            for(var w in websites){
                if(websites[w].developerId === userId){
                    sites.push(websites[w]);
                }
            }
            return sites;
        }
        
        function createWebsite(website) {
            website._id = (new Date()).getTime() + "";
            websites.push(website);
            return website;
        }

        function findWebsiteById(wid){
            for(w in websites){
                if(websites[w]._id === wid){
                    var result = websites[w];
                    //console.log(result);
                    return result;
                }
            }
            return null;
        }

        function deleteWebsite(wid){
            var result = findWebsiteById(wid);
            var index = websites.indexOf(result);
            websites.splice(index, 1);
            return;
            //console.log("111");
        }

        function UpdateWebsite(wid, website) {
            for(w in websites) {
                if(websites[w]._id === wid){
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
            return;
        }
    }
})();
