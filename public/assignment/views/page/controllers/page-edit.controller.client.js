(function(){
    angular
        .module("WamApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.pid = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;
        model.maintainUneditedPage = maintainUneditedPage;
        model.maintainPageByProfile = maintainPageByProfile;

        function init(){
            pageService
                .findPageById(model.pid)
                .then(function (page) {
                    model.page = page;
                    model.uneditedPage = angular.copy(model.page);
                });
        }
        init();

        function updatePage(pid, page){
            if(page.name === ""){
                model.errorMessage = "The page must have a name!"
                return;
            }
            else {
                pageService
                    .updatePage(pid, page)
                    .then(function () {
                        $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
                    }, function () {
                        model.errorMessage = "page doesn't exist!";
                    });
                //console.log(result);
            }
            return;
        }

        function deletePage(pid) {
            pageService
                .deletePage(pid)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
                });
            //console.log(result);
        }

        function maintainUneditedPage(pid) {
            pageService
                .updatePage(pid, model.uneditedPage)
                .then(function () {
                    $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
                });
        }

        function maintainPageByProfile(pid){
            pageService
                .updatePage(pid, model.uneditedPage)
                .then(function () {
                    $location.url("/user/" + model.userId);
                });
        }
    }
})();