var express = require("express");
var router = express.Router();
var path = require("path");
var glob = require("glob");

//Return all mock file names
router.get("/", function(req, res, next) {
  var mockDirPath = path.dirname(__dirname).concat("/MockData");
  var mockDirSearchPath = mockDirPath.concat("/**/*");

  glob(mockDirSearchPath, function(err, files) {
    if (err) {
      res.render("error", {
        error: { message: "Not Found", status: 404, stack: err.stack }
      });
    } else {
      var mockFiles = files.filter(function(file) {
        return (
          !file.startsWith(".") &&
          (file.endsWith(".json") ||
            file.endsWith(".xml") ||
            file.endsWith(".txt") ||
            file.endsWith(".mp3") ||
            file.endsWith(".jpg"))
        );
      });
      var fileNames = mockFiles.map(function(file) {
        var filename = file
          .replace(mockDirPath, "")
          .replace(".xml", "")
          .replace(".txt", "");
        return filename;
      });
      res.json(fileNames).end();
    }
  });
});

module.exports = router;
