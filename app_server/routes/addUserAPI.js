var express = require("express");
var router = express.Router();
var fs = require("fs");
var { exec } = require("child_process");
var csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

var settingsPath = "app_settings/settings.json";

// Создание файла user.csv при запуске системы, если его нет
fs.exists("app_settings/users.csv", function (exists) {
  if (!exists) {
    fs.createWriteStream("app_settings/users.csv", { overwrite: false });
  }
});

router.post("/createUser", (req, res) => {
  var userLogin = req.body.postUserLogin.toLowerCase();
  var userPass = req.body.postUserPass;
  var userEmail = req.body.postUserEmail;
  var userFIO = req.body.postUserFIO;
  var userQuota = req.body.postUserQuota;

  var commandAddUser = `useradd ${userLogin}`;
  var commandSetUserPass = `echo ${userPass} | passwd --stdin ${userLogin}`;
  var commandGetUserId = `id -u ${userLogin}`;
  var systemUserID;
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

    // Получение Id пользователя в системе
    exec(commandGetUserId, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      // console.log(`stdout: ${stdout}`);
      systemUserID = Number(stdout);
      console.log("((((" + systemUserID + ")))))");

      const csvWriter = createCsvWriter({
        path: "app_settings/users.csv",
        header: [
          { id: "id", title: "ID" },
          { id: "login", title: "LOGIN" },
          { id: "email", title: "EMAIL" },
          { id: "fio", title: "FIO" },
          { id: "quota", title: "QUOTA" },
          { id: "isLocked", title: "ISLOCKED" },
        ],
      });

      var rec = [
        {
          id: systemUserID,
          login: userLogin,
          email: userEmail,
          fio: userFIO,
          quota: userQuota,
          isLocked: false,
        },
      ];

      fs.createReadStream("app_settings/users.csv")
        .pipe(csv())
        .on("data", function (data) {
          try {
            rec.push({
              id: data.ID,
              login: data.LOGIN,
              email: data.EMAIL,
              fio: data.FIO,
              quota: data.QUOTA,
              isLocked: data.ISLOCKED,
            });

            csvWriter.writeRecords(rec).then(() => {
              console.log("...Done");
            });
          } catch (err) {
            console.log("Ошибка записи файла");
          }
        })
        .on("end", function () {
          csvWriter.writeRecords(rec).then(() => {
            console.log("...Done");
          });
        });
    });
  });

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
