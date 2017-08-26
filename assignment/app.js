//console.log("hello from server side");
var app = require("../express");

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

app.get("/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUserByUsernameAndPassword);

function getAllUsers(req, response) {
    response.send(users);
}

function getUserById(req, res) {
    for(var u in users){
        if(users[u]._id === req.params.userId){
            res.send(users[u]);
        }
    }
}

function findUserByUsernameAndPassword(req, res) {
    //console.log("findUserByUsernameAndPassword");
    var username = req.query.username;
    var password = req.query.password;
    for (var u in users) {
        var _user = users[u];
        if (_user.username === username && _user.password === password) {
            res.send(_user);
            return;
        }
    }
    res.send("0");
}

