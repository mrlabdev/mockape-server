var express = require("express");
var router = express.Router();
var fs = require("fs");
var urlParse = require("url-parse");
var path = require("path");

/* GET a mock json. */
router.get("/", function(req, res, next) {
  // Get url pathname
  var urlComps = urlParse(req.originalUrl, true);
  // console.log("urlComps: " + urlComps.pathname);

  // Make mock data path
  var mockFilePath = path
    .dirname(__dirname)
    .concat("/MockData")
    .concat(urlComps.pathname)
    .concat(".json");
  // console.log("mockFilePath: " + mockFilePath);

  // Fetch mock file content and return
  fs.readFile(mockFilePath, "utf-8", function(err, file) {
    if (err) {
      res.render("error", {
        error: {
          status: 404,
          message: "Not Found",
          stack: "No mock file found"
        }
      });
    } else {
      res.json(file).end();
    }
  });
});

module.exports = router;