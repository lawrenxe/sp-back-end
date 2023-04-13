const express = require("express");
const router = express.Router();
const dbUser = require("../DB/User/dbUser");

router.use((req, res, next) => {
  next();
});

router.post("/register", (req, res) => {
  console.log("[user:/register] POST Fired");
  dbUser()
    .createUser(req.body)
    .then((result) => {
      console.log(result);
      let body = result;
      res.send(body);
    })
    .catch((err) => {
      console.log("err exists");
      console.log(err);
      if (err.message === "EMAIL_EXISTS") {
        res
          .status(409)
          .json({ success: false, message: "Email already used." });
      } else if (err.message === "USERNAME_EXISTS") {
        res
          .status(409)
          .json({ success: false, message: "Username already used." });
      } else {
        res.status(500).json({ success: false, message: "Unkown Error" });
      }
    });
});

router.post("/login", (req, res) => {
  console.log("[user/login] POST Fired");
  dbUser()
    .verifyUser(req.body)
    .then((result) => {
      console.log("sent");
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "NO_MATCH") {
        res.status(409).json({ success: false, message: "No match." });
      } else {
        res.status(500).json({ success: false, message: "Unknown Error" });
      }
    });
});

module.exports = router;
