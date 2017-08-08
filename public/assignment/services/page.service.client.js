(function(){
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function findPageByWebsiteId(websiteId){

        }
    }
})();
