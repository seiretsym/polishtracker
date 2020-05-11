// dependencies
<<<<<<< HEAD
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var hbs = require("express-handlebars");

// require db models
var db = require("./models");

// app configs
var app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// i moustache you a question
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// make public folder static
app.use(express.static("public"));

// mongoose db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/polishFinder";
mongoose.connect(MONGODB_URI);

// routes
require("./routes/api.js")(app);

// start server
var PORT = process.env.PORT || 3377;
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
=======
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for heroku & react
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// passport config
app.use(session({ secret: "derp", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use(routes);

// mongoose db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/sparkles";
const configs = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(MONGODB_URI, configs);

// start server
const PORT = process.env.PORT || 3377;
app.listen(PORT, function () {
  console.log("App running on port " + PORT);
>>>>>>> 8d4b8ea668df91f1d76e45dae1e757a93e0bb30f
});