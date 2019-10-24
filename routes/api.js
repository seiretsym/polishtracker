// require models
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

// export routes
module.exports = function (app) {

    // main page
    app.get("/", function (req, res) {
        db.Polish.find({}, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
                res.render("index", { polish: data })
            }
        })
    })

    // favorites page
    app.get("/favorite/:id", function (req, res) {
        db.User.find({}).populate("polishes")
        .then(function(data) {
            console.log(data);
            if (data) {
                if (data[0].polishes) {
                    res.render("index", { polish: data[0].polishes })
                } else {
                    res.render("index")
                }
            }
        })
        .catch(function(err) {
            console.log(err)
            res.send(404).end();
        }) 
    })

    // sign in
    app.put("/user/signin", function (req, res) {
        db.User.find(req.body, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data[0]);
            }
        })
    })

    // sign up
    app.post("/user/register", function (req, res) {
        db.User.find(req.body, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                if (data.length > 0) {
                    res.json(false)
                } else {
                    db.User.create(req.body, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json(data);
                        }
                    })
                }
                
            }
        })
    })

    // add a polish to favorites
    app.post("/favorite", function (req, res) {
        console.log(req.body);
        var queryData = {
            _id: req.body.userId,
            polishes: req.body.polishId,
        }
        db.User.findOne(queryData, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    console.log("found")
                } else {
                    // push to user if found
                    db.User.update({ _id: req.body.userId }, { $push: { polishes: req.body.polishId } }, { new: true }, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.json(data);
                        }
                    })
                }
            }
        })
    });

    // scrape route
    app.get("/scrape", function (req, res) {
        // array for storing data
        var array = []
        // callback hell for scraping in sequence
        scrapeLiveLove("https://www.livelovepolish.com", "/collections/best-sellers", function (data) {
            array.push(data)
            scrapeLiveLove("https://www.livelovepolish.com", "/collections/whats-new", function (data) {
                array.push(data)
                // scrape from emily de molly
                scrapeEmilyDeMolly("https://emily-de-molly.myshopify.com", "/collections/new-release", function (data) {
                    array.push(data)
                    scrapeEmilyDeMolly("https://emily-de-molly.myshopify.com", "/collections/best-sellers", function (data) {
                        array.push(data)
                        res.json(array);
                    });
                });
            });
        });
    });
}

// scrape functions
function scrapeLiveLove(root, path, cb) {
    var url = root + path;
    axios.get(url).then(function (response) {


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
                    // update information
                    db.Polish.update(polish, { $set: polish })
                    console.log("polish updated")
                } else {
                    // insert into database if not found
                    db.Polish.create(polish);
                    console.log("polish created")
                }
            })

            // push polish into polishes array for response data
            polishes.push(polish);
        });

        // return callback
        return cb(polishes);
    });
}

function scrapeEmilyDeMolly(root, path, cb) {
    var url = root + path;
    axios.get(url).then(function (response) {

        // Load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(response.data);

        // An empty array to save the data that we'll scrape
        var polishes = [];

        // get them alllllllllllll
        $("div.product-grid").children("div.grid-item").each(function (i, element) {
            var name = $(element).children().children("p").children("span").text();
            var price = $(element).children().children("p").text().trim();
            // trim the price from the nasty string
            price = price.slice(price.length - 7, price.length);
            price = price.replace(/ +/g, "");
            price = price.replace(/\n/g, "");
            var link = $(element).children("a").attr("href");
            var img = $(element).find("div.product-grid-image").children().children("img").attr("src");
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
                    db.Polish.update(polish, { $set: polish })
                    console.log("polish updated")
                } else {
                    // insert into database if not found
                    db.Polish.create(polish);
                    console.log("polish created")
                }
            })

            // push polish into polishes array for response data
            polishes.push(polish);
        });

        // return callback
        return cb(polishes);
    });
}