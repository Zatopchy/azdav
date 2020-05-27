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
  var userLevel = req.body.postUserLevel;
  var userTelephone = req.body.postUserTelephone;
  var userComment = req.body.postUserComment
    ? req.body.postUserComment
    : `Без комментариев`;
  var userFIO = req.body.postUserFIO;
  var userQuota = req.body.postUserQuota;
  var userPath;
  var commandAddUser = `useradd -d ${userPath}${userLogin} ${userLogin}`;
  var commandAddUserWebDav = `echo ${userPass} | htpasswd -i /etc/nginx/webdav.password ${userLogin}`;
  var commandSetUserPass = `echo ${userPass} | passwd --stdin ${userLogin}`;
  var commandSetUserQuota = `setquota -u -F vfsv0 ${userLogin} 0 ${userQuota}M 0 0 /`;
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

    // Установка пароля на пользователя
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
    // Создание пользователя webdav
    exec(commandAddUserWebDav, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
    });

    // Установка квоты на пользователя
    exec(commandSetUserQuota, (error, stdout, stderr) => {
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

      systemUserID = Number(stdout);

      const csvWriter = createCsvWriter({
        path: "app_settings/users.csv",
        header: [
          { id: "id", title: "ID" },
          { id: "login", title: "LOGIN" },
          { id: "email", title: "EMAIL" },
          { id: "level", title: "LEVEL" },
          { id: "telephone", title: "TELEPHONE" },
          { id: "comment", title: "COMMENT" },
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
          level: userLevel,
          telephone: userTelephone,
          comment: userComment,
          fio: userFIO,
          quota: userQuota,
          isLocked: false,
        },
      ];

      fs.createReadStream("app_settings/users.csv")
        .pipe(csv())
        .on("data", function (data) {
          try {
            if (data.ID) {
              rec.push({
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
            }
            csvWriter.writeRecords(rec).then(() => {});
          } catch (err) {
            console.log("Ошибка записи файла");
          }
        })
        .on("end", function () {
          csvWriter.writeRecords(rec).then(() => {});
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
