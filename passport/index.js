const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// setup local strategy for user login
passport.use(new LocalStrategy(
  // configure username/password fields
  {
    usernameField: "username",
    passwordField: "password"
  },
  // check user credentials
  (username, password, done) => {
    // query db
    db.User.findOne({
      where: {
        username: username
      }
    }).then(user => {
      // check if user exists
      if (!user) {
        return done(null, false, {
          message: "Invalid Username"
        });
      }
      // check password
      else if (!user.checkPassword(password)) {
        return done(null, false, {
          message: "Invalid Password"
        });
      }
      // return user otherwise
      else {
        return done(null, user);
      };
    });
  }
));

// serialize user
passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
})

// export passport so we can use it
module.exports = passport;