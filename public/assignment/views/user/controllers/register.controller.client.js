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
                model.errorMessage = "Username and password cannot be empty!";
                return;
            }
            if (user.password != user.verify_password) {
                model.errorMessage = "Make sure the passwords are the same!";
                return;
            }
            if('username' in user && user.username != "") {
                var promise = userService.findUserByUsername(user.username);
                promise.then(function (response) {
                    var _user = response.data;
                    if (_user === "0") {
                        var promise2 = userService.registerUser(user);
                        promise2.then(function (response) {
                            _user = response.data;
                            $location.url("/user/" + _user._id);
                        });
                    }
                    else {
                        model.errorMessage = "Username already exists, try another one";
                    }
                });
            }
            else{
                model.errorMessage = "Must have a username!"
                return;
            }
            //check the passwords are the same
        }
    }
})();