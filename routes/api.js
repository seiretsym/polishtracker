// require models
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

// export routes
module.exports = function (app) {

    // main page
    app.get("/", function (req, res) {
        res.render("index", { polish: "something" })
    })

    // scrape route
    app.get("/scrape", function (req, res) {
        // First, we grab the body of the html with axios
        axios.get("https://www.livelovepolish.com/collections/best-sellers").then(function (response) {

            // need this to prepend to scraped hrefs
            var root = "https://www.livelovepolish.com";

            // Load the HTML into cheerio and save it to a variable
            var $ = cheerio.load(response.data);

            // An empty array to save the data that we'll scrape
            var polishes = [];

            // get them alllllllllllll
            $("div.product-container").each(function (i, element) {
                var name = $(element).find("h3.product-name").children().text();
                var price = $(element).find("div.product-price").children().children().text();
                var link = $(element).find("div.product-thumbnail").children("a").eq(1).attr("href");
                var img = $(element).find(".product-featured-image").attr("src");
                // push result into polishes as an object
                var polish = {
                    name: name,
                    price: price,
                    link: root + link,
                    img: img
                };

                // attempt to find
                db.Polish.findOne(polish, function (err, data) {
                    if (data) {
                        console.log("Already Exists")
                    } else {
                        // insert into database if not found
                        db.Polish.create(polish);
                    }
                })

                // push polish into polishes array for response data
                polishes.push(polish);
            });

            // Send a message to the client
            res.json(polishes)
        });
    });
}