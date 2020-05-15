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
module.exports = router;
