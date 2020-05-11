const router = require("express").Router();
const userController = require("../../../controllers/userController");
const passport = require("../../../passport");

// Matches with "/api/users"
router.route("/register")
  .post(userController.create);
router.route("/login")
  .post(passport.authenticate("local"), (req, res) => {
    res.status(200).json(true);
  });
router.route("/logout")
  .get(userController.logout);
module.exports = router;