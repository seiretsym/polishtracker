var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var NoteSchema = new Schema({
    message: {
        type: String,
        required: true
    }
})

// create model
var Wish = mongoose.model("Wish", NoteSchema);

// export model
module.exports = Wish;