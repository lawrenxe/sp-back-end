const express = require("express");
const router = express.Router();
const dbPost = require("../DB/dbPost");
const multer = require("multer");
const fs = require("fs");

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/" + req.body.username;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const image = multer({ storage: storage });

router.post("/submit", image.single("image"), (req, res) => {
  req.body.image_url = `uploads/${req.body.username}/${req.file.filename}`;
  dbPost()
    .submitPost(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

module.exports = router;
