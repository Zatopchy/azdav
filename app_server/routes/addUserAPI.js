var express = require("express");
var router = express.Router();
var fs = require("fs");

var settingsPath = "app_settings/settings.json";

router.get("/users", (req, res) => {
  res.send({ myData: "This is addUser" });
});

router.post("/createUser", (req, res) => {
  console.log(req.body);
  res.send(`Добавлен новый пользователь: ${req.body.post}`);
});

router.get("/getSettings", (req, res) => {
  fs.readFile(settingsPath, "utf8", function (error, dataSettings) {
    if (error) throw error;
    var objDataSettings = JSON.parse(dataSettings);
    res.send({ settingsAddUser: objDataSettings });
  });
});

module.exports = router;
