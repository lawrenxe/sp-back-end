const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const user = require("./routes/userRoute");
const router = express.Router();

const PORT = 8080;

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", user);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server listening on PORT: ", PORT);
});
