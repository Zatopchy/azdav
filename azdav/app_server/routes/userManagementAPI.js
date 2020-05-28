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
        if (data.ID) {
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
        }
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

  var commandLockUser = `sed -i 's/^${userLogin}:/#${userLogin}:/' /etc/nginx/webdav.password`;

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

  var commandUnLockUser = `sed -i 's/#${userLogin}:/${userLogin}:/' /etc/nginx/webdav.password`;

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
  var commandAddUserUnlockWebDav = `sed -i 's/#${userLogin}:/${userLogin}:/' /etc/nginx/webdav.password`;

  var commandDeleteUserWebDav = `htpasswd -D /etc/nginx/webdav.password ${userLogin}`;
  console.log("[" + commandDeleteUser + "]");

  exec(commandAddUserUnlockWebDav, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      return;
    }
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
            if ((req.body.deleteUserId != data.ID) && (data.ID != "")) {
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
          exec(commandDeleteUserWebDav, (error, stdout, stderr) => {
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
      res.send();
    });
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
          var commandSetUserQuota = `setquota -u -F vfsv0 ${userData.userLogin} 0 ${userData.userQuota}M 0 0 /`;
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
          usersList[i].email = userData.userEmail;
          usersList[i].level = userData.userLevel;
          usersList[i].quota = userData.userQuota;
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
  var commandNewUserPassWebDav = `echo ${userPass} | htpasswd -i /etc/nginx/webdav.password ${userLogin}`;
  var commandNewUserPassUnlockWebDav = `sed -i 's/#${userLogin}:/${userLogin}:/' /etc/nginx/webdav.password`;
  var commandNewUserPassLockUserWebDav = `sed -i 's/^${userLogin}:/#${userLogin}:/' /etc/nginx/webdav.password`;
  var userDataLock = [];
  console.log(req.body);

    fs.createReadStream("app_settings/users.csv")
    .pipe(csv())
    .on("data", function (data) {
      try {
        userDataLock.push({
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
      userDataLock.forEach(function (item, i, arr) {
 
        if (userLogin == userDataLock[i].login){
          console.log(userDataLock[i].isLocked+"!!~~~~")
          if (userDataLock[i].isLocked == "true"){
            res.send(true);
          } else if (userDataLock[i].isLocked == "false") {
            exec(commandNewUserPass, (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }
            });
            exec(commandNewUserPassWebDav, (error, stdout, stderr) => {
              if (error) {
                console.log(`error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
              }
            });
            res.send(false);
          }
        }
      });

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
