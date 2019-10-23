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
var Note = mongoose.model("Note", NoteSchema);

// export model
module.exports = Note;