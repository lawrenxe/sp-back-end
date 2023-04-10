const mongoose = require("mongoose");
const { apiKeys } = require("../../apiKeys");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: String,
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Establish connection to MongoDB

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
  UserModule.EMAIL_EXIST = -1;
  UserModule.EMAIL_NO_EXIST = -2;
  UserModule.USERNAME_EXIST = -3;
  UserModule.NO_MATCH = -4;
  UserModule.UNKNOW_ERROR = 0;

  UserModule.createUser = async (_userDetails) => {
    try {
      const _email = _userDetails.email;
      const _username = _userDetails.username;
      // check if the email already exists
      const emailExists = await User.findOne({ email: _email });
      if (emailExists) {
        console.log("Email already exists");
        return UserModule.EMAIL_EXIST;
      }
      // check if the username already exists
      const usernameExists = await User.findOne({ username: _username });
      if (usernameExists) {
        console.log("Username already exists");
        return UserModule.USERNAME_EXIST;
      }
      // create new user
      const newUser = new User(_userDetails);
      await newUser.save();
      console.log("Successfully saved the user");
      return UserModule.SUCCESS;
    } catch (err) {
      console.log("Unknown error:", err);
      return UserModule.UNKNOWN_ERROR;
    }
  };

  UserModule.verifyUser = async (_loginDetails) => {
    try {
      const _email = _loginDetails.email;
      const _password = _loginDetails.password;
      const emailExists = await User.findOne({ email: _email });
      if (!emailExists) {
        console.log("Email doesnt exist.");
        return UserModule.EMAIL_NO_EXIST;
      }
      const user = await User.findOne({ email: _email, password: _password });
      if (user) {
        return user;
      }
      return UserModule.NO_MATCH;
    } catch (err) {
      return UserModule.UNKNOW_ERROR;
    }
  };

  return UserModule;
};

const user = UserModule();

// user
//   .createUser({
//     email: "test11@example.com",
//     firstName: "John",
//     lastName: "Doe",
//     username: "johndoe11111",
//     password: "password123",
//   })
//   .then((result) => {
//     console.log(result);
//   });

user
  .verifyUser({ email: "test@example.com", password: "password1234" })
  .then((result) => {
    console.log(result);
  });
