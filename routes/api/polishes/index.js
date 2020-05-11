const router = require("express").Router();
const polishController = require("../../../controllers/polishController");
const auth = require("../../../passport/auth");

// Matches with "/api/polishes"
router.route("/")
  .get(polishController.findAll);
router.route("/favorites")
  .get(polishController.findFavorites);
router.route("/favorites/:id")
  .post(polishController.addFavorite)
  .delete(polishController.removeFavorite);
module.exports = router;