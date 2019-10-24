var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    polishes: [{
        type: Schema.Types.ObjectId,
        ref: "Polish"
    }]
})

// create model
var User = mongoose.model("User", UserSchema);

// export model
module.exports = User;