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
UserSchema.pre("save", function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
    }
    return next();
});

// method for verifying password
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// create model
const User = mongoose.model("User", UserSchema);

// export model
module.exports = User;