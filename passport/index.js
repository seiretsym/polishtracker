const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// setup local strategy for user login
passport.use(new LocalStrategy(
  // configure username/password fields
  {
    usernameField: "",
    passwordField: ""
  },
  // check user credentials
  (email, password, done) => {
    // query db

  }
))

// serialize user
passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
})

// export passport so we can use it
module.exports = passport;