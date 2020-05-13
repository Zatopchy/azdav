var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/getExportFile", (req, res) => {
  res.send({ myData: "This is addUser" });
});

module.exports = router;
