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

        function init(){
            model.page = pageService.findPageById(model.pid);
        }
        init();

        function updatePage(pid, page){
            if(page.name === ""){
                model.errorMessage = "The page must have a name!"
                return;
            }
            else {
                var result = pageService.updatePage(pid, page);
                //console.log(result);
                $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
            }
            return;
        }

        function deletePage(pid) {
            var result = pageService.deletePage(pid);
            //console.log(result);
            $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
        }

        //console.log(model.pid);
    }
})();