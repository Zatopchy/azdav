var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/getExportFile", (req, res) => {
  var filePath = "app_settings/users.csv";
  var fileName = "users.csv";
  res.download(filePath, fileName);
});

module.exports = router;
