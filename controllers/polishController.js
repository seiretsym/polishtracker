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
    db.User
      .find(req.user)
      .populate("favorites")
      .then(({ favorites }) => {
        res.status(200).json(favorites);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  },
  addFavorite: (req, res) => {
    db.User
      .findOneAndUpdate(req.user,
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
  },
  removeFavorite: (req, res) => {
    db.User
      .findOneAndUpdate(req.user,
        {
          $pull: {
            polishes: req.params.id
          }
        })
      .then(() => {
        res.status(201).json(true);
      })
      .catch(err => {
        res.status(401).json(err)
      });
  }
};