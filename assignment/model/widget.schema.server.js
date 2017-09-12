var mongoose = require("mongoose");
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: "pageModel"},
    type: String,
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    order: Number,
    formatted: Boolean,
    class: String
}, {collection: 'widget'});

module.exports = widgetSchema;