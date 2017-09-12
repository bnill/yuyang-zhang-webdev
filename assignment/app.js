var app = require('../express');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

//var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds151222.mlab.com:51222/heroku_lgcnhhhs'; // user yours
}

mongoose.connect(connectionString);

require("./services/user.service.server");
require("./services/website.service.server");
require("./services/page.service.server");
require("./services/widget.service.server");