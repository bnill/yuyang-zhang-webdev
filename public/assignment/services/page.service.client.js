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
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;

        function createPage(page){
            page._id = (new Date()).getTime() + "";
            pages.push(page);
            return page;
        }

        function findPageByWebsiteId(wid){
            var result_pages = [];
            for(var p in pages){
                if(pages[p].websiteId === wid){
                    result_pages.push(pages[p]);
                }
            }
            //console.log(result_pages);
            return result_pages;
        }

        function findPageById(pid){
            for(var p in pages){
                if(pages[p]._id === pid){
                    return pages[p];
                }
            }
            return;
        }

        function updatePage(pid, page){
            for(var p in pages){
                if(pages[p]._id === pid){
                    pages[p] = page;
                    return pages[p];
                }
            }
            return;
        }

        function deletePage(pid){
            var result = findPageById(pid);
            var index = pages.indexOf(result);
            pages.splice(index, 1);
            return result;
        }

    }
})();
