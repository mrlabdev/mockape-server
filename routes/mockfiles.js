var express = require("express");
var router = express.Router();
var path = require("path");
var fs = require("fs");
var glob = require("glob");

//Return all mock file names
router.get("/", function(req, res, next) {
  var mockDirPath = path
    .dirname(__dirname)
    .concat("/MockData")
    .concat("/**/*");
  // console.log(mockDirPath);
  glob(mockDirPath, function(err, files) {
    if (err) {
      res.render("error", {
        error: { message: "Not Found", status: 404, stack: err.stack }
      });
    } else {
      var mockFiles = files.filter(function(file) {
        return !file.startsWith(".") && file.endsWith(".json");
      });

      mockFiles.forEach(function(file) {
        // console.log(file);
        res.write(file + "\n", (encoding = "utf8"));
      });
      res.end();
    }
  });
});

module.exports = router;
