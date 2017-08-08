(function(){
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location){
        var model = this;
        model.registerUser = registerUser;

        function init(){

        }
        init();

        function registerUser(user){
            //check same username
            if(!user){
                model.errorMessage = "Username and password cannot be empty!"
                return;
            }
            if('username' in user && user.username != "") {
                var _user = userService.findUserByUsername(user.username);
                if (!_user) {
                    if (user.password != user.verify_password) {
                        model.errorMessage = "Make sure the passwords are the same!"
                    } else {
                        var user = userService.registerUser(user);
                        $location.url("/user/" + user._id);
                    }
                } else {
                    model.errorMessage = "Username already exists, try another one";
                }
            }
            else{
                model.errorMessage = "Must have a username!"
                return;
            }
            //check the passwords are the same
        }
    }
})();
