const router = require("express").Router();
const scrapeController = require("../../../controllers/scrapeController");

// Matches with "/api/scrapes"
router.route("/")
  .get(scrapeController.scrape);
module.exports = router;