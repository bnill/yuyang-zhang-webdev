(function(){
    angular
        .module("WamApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $http, $location) {
        var model = this;
        var userId = $routeParams["userId"];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        function init(){
            var promise = userService.findUserById(userId);
            promise.then(function (response) {
                model.user = response.data;
            });
        }
        init();

        function updateUser(userId, User){
            userService.updateUser(userId, User);
        }

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function () {
                    $location.url("/login");
                }, function () {
                    model.errorMessage = "Failed to delete!";
                });
        }
    }
})();
