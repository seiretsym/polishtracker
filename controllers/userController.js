const db = require("../models");

// defining methods used for user queries
module.exports = {
  // create new user
  create: (req, res) => {
    const { username, password } = req.body;
    db.User.create({
      username: username,
      password: password
    }).then(() => {
      // redirect user to login
      res.redirect(307, "/api/users/login")
    }).catch(err => {
      // dat error :<
      res.status(401).json(err);
    })
  }
};