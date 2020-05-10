const router = require("express").Router();
const wishController = require("../../../controllers/wishController");

// Matches with "/api/wishes"
router.route("/:id")
  .post(wishController.create);
module.exports = router;