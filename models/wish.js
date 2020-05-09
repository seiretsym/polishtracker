const mongoose = require("mongoose");

// schema structure
const Schema = mongoose.Schema

// create schema
const WishSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

// create model
const Wish = mongoose.model("Wish", WishSchema);

// export model
module.exports = Wish;