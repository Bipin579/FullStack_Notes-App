const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "Please provide name"] },
  email: {
    type: String,
    required: [true, "Please provide email"]
  },
  pass: { type: String, required: [true, "Please provide the password"] },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
