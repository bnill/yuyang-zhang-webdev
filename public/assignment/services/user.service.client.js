(function(){
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http){
        var api = {
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser
        };

        return api;

        function updateUser(userId, user){
            var url = "/api/user/" + userId;
            return $http.put(url, user);
        }

        function findUserByUsername(username){
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function registerUser(user){
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId){
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsernameAndPassword(username, password){
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }
    }
})();
