var express = require("express");
var router = express.Router();
var fs = require("fs");
const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "app_settings");
  },
  filename: (req, file, cb) => {
    cb(null, "users.csv");
  },
});
const confImportFile = multer({ storage: storageConfig });

router.post("/uploadImportFile", confImportFile.single("importFile"), function (
  req,
  res,
  next
) {
  let importFile = req.file;

  console.log(importFile);
  if (!importFile) res.send({ importResponse: "Ошибка при загрузке файла" });
  else res.send({ importResponse: "Настройки успешно загружены!" });
});

module.exports = router;
