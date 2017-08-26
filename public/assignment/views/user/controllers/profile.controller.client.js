(function myFunction() {
    angular.module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService) {
        var model = this;
        var userId = $routeParams["userId"];
        function init(){
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            });
        }
        init();

        function updateUser(User){
            var _user = userService.updateUser(user._id, user);
            if(!_user){
                $location.url("/profile/" + user._id);
            }
        }
    }
})();
