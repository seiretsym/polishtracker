const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// schema structure
const Schema = mongoose.Schema

// create schema
const UserSchema = new Schema({
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

// add a hook to hash password before create
UserSchema.pre("save", user => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
});

// create model
const User = mongoose.model("User", UserSchema);

// method for verifying password
User.prototype.checkPassword = password => {
    return bcrypt.compareSync(password, this.password)
};

// export model
module.exports = User;