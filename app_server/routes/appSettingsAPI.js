var express = require("express");
var router = express.Router();
var fs = require("fs");

var settingsPath = "app_settings/settings.json";

router.get("/users", (req, res) => {
  res.send({ myData: "This is addUser" });
});

router.post("/saveSettings", (req, res) => {
  console.log(req.body);
  fs.writeFile(settingsPath, JSON.stringify(req.body), (err) => {
    if (err) console.log("error writing file: " + settingsPath);
  });
  res.send(`Настройки сохранены успешно`);
});

module.exports = router;
