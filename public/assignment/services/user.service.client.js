(function(){
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http){
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

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
