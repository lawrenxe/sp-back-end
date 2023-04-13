const mongoose = require("mongoose");
const { apiKeys } = require("../../apiKeys");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModule = () => {
  mongoose
    .connect(apiKeys.MONGO_AUTH)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });

  const User = mongoose.model("Users", userSchema);

  let UserModule = {};
  UserModule.SUCCESS = 1;
  UserModule.EMAIL_EXISTS = -1;
  UserModule.EMAIL_NO_EXISTS = -2;
  UserModule.USERNAME_EXISTS = -3;
  UserModule.NO_MATCH = -4;
  UserModule.UNKNOWN_ERROR = 0;

  UserModule.createUser = async (_userDetails) => {
    const _email = _userDetails.email;
    const _username = _userDetails.username;
    // check if the email already exists
    const emailExists = await User.findOne({ email: _email });
    mongoose.disconnect();
    if (emailExists) {
      console.log("here");
      throw new Error("EMAIL_EXISTS");
    }
    // check if the username already exists
    const usernameExists = await User.findOne({ username: _username });
    if (usernameExists) {
      throw new Error("USERNAME_EXISTS");
    }
    // create new user
    const newUser = new User(_userDetails);
    await newUser.save();
    return newUser;
  };

  UserModule.verifyUser = async (_loginDetails) => {
    const _email = _loginDetails.email;
    const _password = _loginDetails.password;
    console.log(_email);
    console.log(_password);
    const user = await User.findOne({ email: _email, password: _password });
    mongoose.disconnect();
    if (user) {
      return user;
    }
    throw new Error("NO_MATCH");
  };

  return UserModule;
};

module.exports = UserModule;
