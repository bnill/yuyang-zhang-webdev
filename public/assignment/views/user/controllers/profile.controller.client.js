(function(){
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $http) {
        var model = this;
        var userId = $routeParams["userId"];
        model.updateUser = updateUser;
        function init(){
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            });
        }
        init();

        function updateUser(userId, User){
            userService.updateUser(userId, User);
            /*
            if(!_user){
                $location.url("/profile/" + user._id);
            }
            */
        }
    }
})();
