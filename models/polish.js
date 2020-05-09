const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const PolishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    wish: [{
        type: Schema.Types.ObjectId,
        ref: "Wish"
    }]
})

// create model
const Polish = mongoose.model("Polish", PolishSchema);

// export model
module.exports = Polish;