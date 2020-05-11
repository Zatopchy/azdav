var express = require("express");
var router = express.Router();
var fs = require("fs");

var settingsPath = "app_settings/settings.json";

router.get("/getSettings", (req, res) => {
  fs.readFile(settingsPath, "utf8", function (error, dataSettings) {
    if (error) throw error;
    var objDataSettings = JSON.parse(dataSettings);
    res.send({ systemSettings: objDataSettings });
  });
});

router.post("/saveSettings", (req, res) => {
  console.log(req.body);
  fs.writeFile(settingsPath, JSON.stringify(req.body), (err) => {
    if (err) {
      console.log("error writing file: " + settingsPath);
      res.send({ responseSaveData: "Ошибка при сохрании" });
    } else {
      res.send({ responseSaveData: "Настройки сохранены успешно" });
    }
  });
});

module.exports = router;
