const router = require("express").Router();
const userController = require("../../../controllers/userController");
const passport = require("../../../passport");

// Matches with "/api/users"
router.route("/")
  .get((req, res) => {
    res.json({ ok: true })
  });
router.route("/register")
  .post(userController.create);
router.route("/login")
  .post(passport.authenticate("local"), (req, res) => {
    console.log("login successful")
    res.json(req.user);
  });
module.exports = router;