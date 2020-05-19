var express = require("express");
var router = express.Router();
var fs = require("fs");
var { exec } = require("child_process");
var csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

router.get("/getUser", (req, res) => {
  var users = [];
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
      res.send(users);
    });
});

router.post("/lockUser", (req, res) => {
  console.log(req.body);
  var usersList = [];
  var userLogin = req.body.lockUserLogin;

  var commandLockUser = `passwd -l ${userLogin}`;
  // console.log("[" + commandLockUser + "]");
  exec(commandLockUser, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
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

    fs.createReadStream("app_settings/users.csv")
      .pipe(csv())
      .on("data", function (data) {
        try {
          usersList.push({
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
        usersList.forEach(function (item, i, arr) {
          if (req.body.lockUserId == usersList[i].id) {
            usersList[i].isLocked == "false"
              ? ((usersList[i].isLocked = "true"),
                (userLogin = usersList[i].login))
              : null;
          }
        });

        csvWriter.writeRecords(usersList);
      });
    res.send();
  });
});

router.post("/unLockUser", (req, res) => {
  console.log(req.body);
  var usersList = [];
  var userLogin = req.body.unLockUserLogin;

  var commandUnLockUser = `passwd -u ${userLogin}`;
  // console.log("[" + commandUnLockUser + "]");

  exec(commandUnLockUser, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
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

    fs.createReadStream("app_settings/users.csv")
      .pipe(csv())
      .on("data", function (data) {
        try {
          usersList.push({
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
        usersList.forEach(function (item, i, arr) {
          if (req.body.unLockUserId == usersList[i].id) {
            usersList[i].isLocked == "true"
              ? (usersList[i].isLocked = "false")
              : null;
          }
        });

        csvWriter.writeRecords(usersList);
      });
    res.send();
  });
});

router.post("/deleteUser", (req, res) => {
  console.log(req.body);
  var usersList = [];
  var userLogin = req.body.deleteUserLogin;

  var commandDeleteUser = `userdel --remove ${userLogin}`;
  console.log("[" + commandDeleteUser + "]");

  exec(commandDeleteUser, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

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

    fs.createReadStream("app_settings/users.csv")
      .pipe(csv())
      .on("data", function (data) {
        try {
          if (req.body.deleteUserId != data.ID) {
            usersList.push({
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
        } catch (err) {
          console.log("Ошибка записи файла");
        }
      })
      .on("end", function () {
        csvWriter.writeRecords(usersList);
      });
    res.send();
  });
});

router.post("/editModalRun", (req, res) => {
  console.log(req.body);
  var editUser;

  fs.createReadStream("app_settings/users.csv")
    .pipe(csv())
    .on("data", function (data) {
      try {
        if (req.body.userId == data.ID) {
          editUser = {
            id: data.ID,
            login: data.LOGIN,
            email: data.EMAIL,
            level: data.LEVEL,
            telephone: data.TELEPHONE,
            comment: data.COMMENT,
            fio: data.FIO,
            quota: data.QUOTA,
            isLocked: data.ISLOCKED,
          };
        }
      } catch (err) {
        console.log("Ошибка записи файла");
      }
    })
    .on("end", function () {
      res.send(editUser);
    });
});

router.post("/editUser", (req, res) => {
  var userData = req.body.user;
  console.log(userData);
  var usersList = [];

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

  fs.createReadStream("app_settings/users.csv")
    .pipe(csv())
    .on("data", function (data) {
      try {
        usersList.push({
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
      usersList.forEach(function (item, i, arr) {
        if (userData.userId == usersList[i].id) {
          usersList[i].email = userData.userEmail;
          usersList[i].level = userData.userLevel;
          usersList[i].telephone = userData.userTelephone;
          usersList[i].comment = userData.userComment;
          usersList[i].fio = userData.userFIO;
        }
      });

      csvWriter.writeRecords(usersList);
    });
  res.send(userData);
});

router.post("/newUserPass", (req, res) => {
  var userLogin = req.body.login;
  var userPass = req.body.pass;
  var commandNewUserPass = `echo ${userPass} | passwd --stdin ${userLogin}`;
  console.log(req.body);
  exec(commandNewUserPass, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    res.send("Пароль обновлён");
  });
});

router.get("/getSettings", (req, res) => {
  var settingsPath = "app_settings/settings.json";

  fs.readFile(settingsPath, "utf8", function (error, dataSettings) {
    if (error) throw error;
    var objDataSettings = JSON.parse(dataSettings);
    res.send({ settingsEditUser: objDataSettings });
  });
});

module.exports = router;
