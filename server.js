// dependencies
const express = require("express");
const mongoose = require("mongoose");

// middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for heroku & react
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// routing
app.use("routes");

// mongoose db
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/polishFinder";
mongoose.connect(MONGODB_URI);

// start server
const PORT = process.env.PORT || 3377;
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});