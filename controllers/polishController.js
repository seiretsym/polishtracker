const db = require("../models");

// defining methods used for polish queries
module.exports = {
  findAll: (req, res) => {
    db.Polish
      .find({})
      .populate("wishes")
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  },
  findFavorites: (req, res) => {
    if (req.user) {
      db.User
        .find({ _id: req.user._id })
        .populate("favorites")
        .then(data => {
          console.log(data);
          console.log(data[0].favorites);
          res.status(200).json(data[0].favorites);
        })
        .catch(err => {
          console.log("problem adding polish to user")
          console.log(err)
          res.json(err);
        });
    } else {
      res.json("redirect")
    }
  },
  addFavorite: (req, res) => {
    if (req.user) {
      db.User
        .findOneAndUpdate({ _id: req.user._id },
          {
            $addToSet: {
              favorites: req.params.id
            }
          })
        .then(() => {
          res.status(201).json(true);
        })
        .catch(err => {
          res.status(401).json(err);
        });
    } else {
      res.json("redirect");
    }
  },
  removeFavorite: (req, res) => {
    console.log(req.params.id);
    if (req.user) {
      db.User
        .findOneAndUpdate({ _id: req.user._id },
          {
            $pull: {
              favorites: req.params.id
            }
          })
        .then(() => {
          console.log("removed from favorites")
          res.status(201).json(true);
        })
        .catch(err => {
          console.log(err)
          res.status(401).json(err)
        });
    } else {
      res.json("redirect");
    }
  }
};