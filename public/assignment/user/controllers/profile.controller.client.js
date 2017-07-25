(function myFunction() {
    angular.module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];
        function init(){
            model.user = userService.findUserById(userId);
        }
        init();
    }
})();
