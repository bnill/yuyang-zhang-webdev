var mongoose = require("mongoose");
var pageSchema = mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref: "websiteModel"},
    name: String,
    description: String
    //widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "widgetModel"}]
}, {collection: 'page'});

module.exports = pageSchema;