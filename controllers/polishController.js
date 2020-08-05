const db = require("../models");
const axios = require("axios");

// defining methods used for polish queries
module.exports = {
  findAll: (req, res) => {
    db.Polish
      .find({})
      .populate("wishes")
      .then(data => {
        // check if item still exists
        data.forEach(polish => {
          axios
            .get(polish.link)
            .then(response => {
              console.log(response.data);
            })
            .catch(err => {
              // removes from db if it doesn't
              console.log("error with: ", polish.link);
              db.Polish
                .remove({ _id: polish._id })
                .then(() => {
                  console.log("polish removed")
                })
            })
        })
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
          res.status(200).json(data[0].favorites);
        })
        .catch(err => {
          console.log("problem adding polish to user");
          console.log(err);
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
          console.log(err);
          res.status(401).json(err);
        });
    } else {
      res.json("redirect");
    }
  }
};