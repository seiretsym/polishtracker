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
                wishes: wish._id
              }
            },
            {
              new: true
            }).then(() => {
              console.log("wish added to polish")
              res.status(201).json(true);
            });
      }).catch(err => {
        console.log(err);
        res.status(401).json(err)
      });
  }
};