const router = require("express").Router();
const users = require("./users");
const polishes = require("./polishes");
const wishes = require("./wishes");
const scrapes = require("./scrapes");

// route to specific apis
router.use("/users", users);
router.use("/polishes", polishes);
router.use("/wishes", wishes);
router.use("/scrapes", scrapes);

module.exports = router;