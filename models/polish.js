var mongoose = require("mongoose");

// schema structure
var Schema = mongoose.Schema

// create schema
var PolishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

// create model
var Polish = mongoose.model("Polish", PolishSchema);

// export model
module.exports = Polish;