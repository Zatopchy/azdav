var express = require("express");
var router = express.Router();
var fs = require("fs");
var { exec } = require("child_process");
var csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
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
  var users = [];
  console.log(importFile);
  if (!importFile) res.send({ importResponse: "Ошибка при загрузке файла" });
  else {
    fs.createReadStream("app_settings/users.csv")
      .pipe(csv())
      .on("data", function (data) {
        try {
          users.push({
            id: data.ID,
            login: data.LOGIN,
            email: data.EMAIL,
            level: data.LEVEL,
            telephone: data.TELEPHONE,
            comment: data.COMMENT,
            fio: data.FIO,
            quota: data.QUOTA,
            isLocked: data.ISLOCKED,
          });
        } catch (err) {
          console.log("Ошибка записи файла");
        }
      })
      .on("end", function () {
        users.forEach(function (item, i, arr) {
          var userLogin = users[i].login;
          var userPass = `123123`;
          var commandAddUser = `useradd ${userLogin}`;
          var commandSetUserPass = `echo ${userPass} | passwd --stdin ${userLogin}`;
          // Создание пользователя в системе
          exec(commandAddUser, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }

            // Установка пароля для пользователя
            exec(commandSetUserPass, (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }
            });
          });
        });
      });
    res.send({ importResponse: "Настройки успешно загружены!" });
  }
});

module.exports = router;
