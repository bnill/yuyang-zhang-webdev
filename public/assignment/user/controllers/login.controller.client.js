(function myFunction() {
    angular.module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;
        model.login = login;
        function init(){

        }
        init();

        function login(user) {
            if(!user){
                model.errorMessage = "User not found";
                return;
            }
            user = userService.findUserByUsernameAndPassword(model.user.username, model.user.password);
            if(user === null){
                model.errorMessage = "User and password pair not found";
            }
            else{
                $location.url("/user/"+ user._id);
            }
        }
    }
})();
