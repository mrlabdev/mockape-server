var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var urlParse = require("url-parse");

/* GET a mock json. */
router.get("/", function(req, res, next) {
  // Get url pathname
  var urlComps = urlParse(req.originalUrl, true);
  // console.log("urlComps: " + urlComps.pathname);

  // Make mock data path
  var mockFilePath = path
    .dirname(__dirname)
    .concat("/MockData")
    .concat(urlComps.pathname);

  if (!mockFilePath.endsWith(".xml")) {
    mockFilePath = mockFilePath.concat(".json");
  }

  console.log("mockFilePath: " + mockFilePath);

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
      try {
        let fileJson = JSON.parse(file);
        res.json(fileJson).end();
      } catch (err) {
        console.log(err);
        if (err.name.startsWith("SyntaxError")) {
          res.setHeader("Content-Type", "application/xhtml+xml");
          res.send(file).end();
        }
      }
    }
  });
});

module.exports = router;
