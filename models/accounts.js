const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    "first_name": String,
    "last_name": String,
    "email": {
        "type": String,
        "unique": true
    },
    "clerk": Boolean,
    "password": String
})


module.exports = accountSchema;