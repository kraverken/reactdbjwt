const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const userObj = mongoose.model("user", userSchema);

module.exports = userObj;
