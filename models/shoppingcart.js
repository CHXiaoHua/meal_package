const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartSchema = new Schema({
    "title": String,
    "price": Number,
    "number": Number
});

module.exports = cartSchema;