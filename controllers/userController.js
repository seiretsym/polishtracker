const db = require("../models");

// defining methods used for user queries
module.exports = {
  // create new user
  create: (req, res) => {
    db.User.create(req.body).then(() => {
      // redirect user to login
      res.redirect(307, "/api/users/login")
    }).catch(err => {
      // dat error :<
      res.status(401).json(err);
    })
  },
  logout: (req, res) => {
    req.logout();
    res.status(200).json(false);
  }
};