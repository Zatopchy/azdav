var express = require("express");
var router = express.Router();

router.get("/lol", function (req, res, next) {
  res.send("Это лолкек))");
});

router.get("/getUser", (req, res) => {
  var users = [
    {
      id: "7",
      login: "Alex",
      email: "alexlol@mail.ru",
      fio: "Александр Петрович Кержаков",
      quota: "2000",
      isLocked: true,
    },
    {
      id: "8",
      login: "Илья",
      email: "ilya@mail.ru",
      fio: "Илья Сергеевич Шляпин",
      quota: "4096",
      isLocked: true,
    },
    {
      id: "9",
      login: "Михаил",
      email: "misha@mail.ru",
      fio: "Михаил Олегович Спаржин",
      quota: "1024",
      isLocked: false,
    },
  ];
  res.send(users);
});

router.post("/search", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

module.exports = router;
