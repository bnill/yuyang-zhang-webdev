//console.log("hello from server side");
var app = require("../../express");
var userModel = require("../model/user.model.server");

/*
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];
*/

app.get("/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", registerUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        })
    /*
    for(var u in users){
        if(users[u]._id === userId){
            var result = users[u];
            var index = users.indexOf(result);
            users.splice(index, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
    /*
    for(var u in users){
        if(users[u]._id === userId){
            users[u] = user;
            res.send(user);
            return;
        }
    }
    res.sendStatus(404);
    */
}

function registerUser(req, response) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            response.send(user);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
        });
    /*
    user._id = (new Date()).getTime() + "";
    users.push(user);
    response.send(user);
    */
}

function getAllUsers(req, response) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.send(users);
            return;
        })
}

function getUserById(req, res) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.send(user);
        }, function () {
            res.sendStatus(404);
        });
    /*
    for(var u in users){
        if(users[u]._id === req.params.userId){
            res.send(users[u]);
        }
    }
    */
}

function findUser(req, res) {
    //console.log("findUserByUsernameAndPassword");
    var username = req.query.username;
    var password = req.query.password;
    if(username && password){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user === null) {
                    res.send("0");
                    return;
                }
                res.send(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
    else if(username){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user === null) {
                    res.send("0");
                    return;
                }
                res.send(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            })
    }

    /*
    if(username && password) {
        for (var u in users) {
            var _user = users[u];
            if (_user.username === username && _user.password === password) {
                res.send(_user);
                return;
            }
        }
        res.send("0");
        return;
    }
    else if(username){
        for(var u in users){
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
        return;
    }
    */
}

