const router = require("express").Router();
const wishController = require("../../../controllers/wishController");

// Matches with "/api/polishes"
router.route("/:id")
  .post(wishController.create);
module.exports = router;