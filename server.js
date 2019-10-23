// dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var hbs = require("express-handlebars");

// require db models
var db = require(".models");

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
require("./routes/api.js")

// start server
var PORT = process.env.PORT || 3377;
app.listen(PORT, function() {
    console.log("App running on port " + PORT);
});