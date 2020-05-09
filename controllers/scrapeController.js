const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

// defining methods used for polish queries
module.exports = {
  scrape: function (req, res) {
    // define an array to store all scraped polish data
    let polishes = [];
    // begin callback hell
    scrapeLiveLove("best-sellers", null, null, function (data) {
      polishes = [...data];
      scrapeLiveLove("whats-new", null, null, function (data) {
        polishes = [...polishes, ...data];
        res.status(200).json(polishes)
      })
    });
  }
};

// scrape live love polish for best sellers
function scrapeLiveLove(type, page, polish, cb) {
  let url;

  // check for pages
  if (page) {
    url = `https://www.livelovepolish.com/collections/${type}?page=${page}`;
  } else {
    url = `https://www.livelovepolish.com/collections/${type}`;
  }

  // grab page with axios
  axios.get(url).then(function (response) {

    // Load the HTML into cheerio and store it in $
    const $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    const polishes = polish || [];

    // get them alllllllllllll
    $("div.product-container").each(function (i, element) {
      const name = $(element).find("h3.product-name").children().text().trim();
      let price = $(element).find("div.product-price").children().children().text();
      price = price.replace("$", "");
      const link = $(element).find("div.product-thumbnail").children("a").eq(1).attr("href");
      const img = $(element).find(".product-featured-image").attr("src");

      // push result into polishes as an object
      const polish = {
        name: name,
        price: parseFloat(price).toFixed(2),
        link: "http://www.livelovepolish.com" + link,
        img: "https:" + img,
        type: type,
        brand: "Live Love Polish"
      };

      // attempt to find then update/create
      db.Polish.findOneAndUpdate({ name: polish.name }, { $set: polish }, { new: true })
        .then(function (data) {
          // if polish isn't found and updated
          if (!data) {
            // create new polish
            db.Polish.create(polish);
          }
        }).catch(err => {
          console.log(err)
        })

      // push polish into polishes array for response data
      polishes.push(polish);
    });

    // check for next page
    const next = $("div.pagination").children("span.next").children("a").children("span").text().trim();
    if (next) {
      let nextPage = $("span.current").text().trim();
      nextPage = parseInt(nextPage);
      nextPage += 1;
      return scrapeLiveLove(type, nextPage, polishes, cb);
    } else {
      return cb(polishes);
    }
  });
}