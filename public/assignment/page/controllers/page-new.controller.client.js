(function () {
    angular
        .module("WamApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.wid = $routeParams.wid;
        model.createPage = createPage;

        function init(){

        }
        init();

        function createPage(page){
            if(!page || page.name === "" || !('name' in page)){
                model.errorMessage = "A page must have its name!"
            }
            else {
                page.websiteId = model.wid;
                var result = pageService.createPage(page);
                //console.log(result);
                $location.url("/user/" + model.userId + "/website/" + model.wid + "/page");
            }
        }
    }

})()