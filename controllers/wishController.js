const db = require("../models");

// defining methods used for wish queries
module.exports = {
  create: (req, res) => {
    const data = {
      username: req.user.username,
      message: req.body.message
    }
    db.Wish
      .create(data)
      .then(wish => {
        db.Polish
          .findOneAndUpdate(
            {
              _id: req.params.id
            },
            {
              $push: {
                wish: wish._id
              }
            },
            {
              new: true
            }).then(() => {
              res.status(201).json(true);
            });
      }).catch(err => {
        res.status(401).json(err)
      });
  }
};