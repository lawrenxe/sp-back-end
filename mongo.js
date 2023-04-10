const mongoose = require("mongoose");
const { apiKeys } = require("./apiKeys");

const MONGO_AUTH = apiKeys.MONGO_AUTH;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_AUTH);
}

const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});

const Users = mongoose.model("Users", userSchema);

const lawrence = new Users({
  email: "yizhou@outlook.com",
  firstName: "Yizhou",
  lastName: "Wang",
  username: "yizhouw",
  password: "123456",
});

lawrence.save();
