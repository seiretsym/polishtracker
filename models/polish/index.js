const mongoose = require("mongoose");
const User = require("../user");

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

// add hook to remove polish from favorites when polish is deleted
PolishSchema.pre("remove", function (next) {
  User
    .find({},
      {
        $pull: {
          polishes: this._id
        }
      })
    .then(() => {
      next();
    })
})

// create model
const Polish = mongoose.model("Polish", PolishSchema);

// export model
module.exports = Polish;