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
    cb(null, "importUsers.csv");
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
    fs.createReadStream("app_settings/importUsers.csv")
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
        const csvWriterImport = createCsvWriter({
          path: "app_settings/importUsers.csv",
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
        users.forEach(function (item, i, arr) {
          var userLogin = users[i].login;
          var userQuota = users[i].quota;
          var userID = Number(users[i].id);
          var userIsLocked = users[i].isLocked;
          var userPass = `123123`;
          var userPath;
          var commandAddUser = `useradd -d ${userPath}${userLogin} ${userLogin}`;
          var commandAddUserWebDav = `echo ${userPass} | htpasswd -i /etc/nginx/webdav.password ${userLogin}`;
          var commandAddUserLockWebDav = `sed -i 's/^${userLogin}:/#${userLogin}:/' /etc/nginx/webdav.password`;
          var commandAddUserUnlockWebDav = `sed -i 's/#${userLogin}:/${userLogin}:/' /etc/nginx/webdav.password`;
          var commandSetUserPass = `echo ${userPass} | passwd --stdin ${userLogin}`;
          var limitID = userID + 5000;
          var commandSetID = `usermod -u ${limitID} ${userLogin}`;
          users[i].id = limitID;
          var commandSetUserQuota = `setquota -u -F vfsv0 ${userLogin} 0 ${userQuota}M 0 0 /`;
          // Создание пользователя в системе
          exec(commandAddUser, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              // Установка id пользователю
              exec(commandSetID, (error, stdout, stderr) => {
                if (error) {
                  console.log(`error: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  return;
                }
              });
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
              // Установка квоты для пользователя
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
              return;
            }
          });

          exec(commandAddUserWebDav, (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              if (userIsLocked == "true") {
                exec(commandAddUserLockWebDav, (error, stdout, stderr) => {
                  if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                  }
                  if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                  }
                });
              } else {
                exec(commandAddUserUnlockWebDav, (error, stdout, stderr) => {
                  if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                  }
                  if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                  }
                });
              }
              return;
            }
          });
        });

        const csvWriterAllUsers = createCsvWriter({
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
            csvWriterAllUsers.writeRecords(users).then(() => {});
          });
      });

    res.send({ importResponse: "Настройки успешно загружены!" });
  }
});

module.exports = router;
