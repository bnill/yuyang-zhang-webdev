(function(){
    angular
        .module("WamApp")
        .factory("pageService", pageService);

    function pageService($http){

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;

        function createPage(page){
            var url = "/api/website/" + page.websiteId + "/page"
            return $http.post(url, page);
            /*
            page._id = (new Date()).getTime() + "";
            pages.push(page);
            return page;
            */
        }

        function findPageByWebsiteId(wid){
            var url = "/api/website/" + wid + "/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*
            var result_pages = [];
            for(var p in pages){
                if(pages[p].websiteId === wid){
                    result_pages.push(pages[p]);
                }
            }
            //console.log(result_pages);
            return result_pages;
            */
        }

        function findPageById(pid){
            var url = "/api/page/" + pid;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
            /*
            for(var p in pages){
                if(pages[p]._id === pid){
                    return pages[p];
                }
            }
            return;
            */
        }

        function updatePage(pid, page){
            var url = "/api/page/" + pid;
            return $http.put(url, page);
            /*
            for(var p in pages){
                if(pages[p]._id === pid){
                    pages[p] = page;
                    return pages[p];
                }
            }
            return;
            */
        }

        function deletePage(pid){
            var url = "/api/page/" + pid;
            return $http.delete(url);
            /*
            var result = findPageById(pid);
            var index = pages.indexOf(result);
            pages.splice(index, 1);
            return result;
            */
        }

    }
})();
