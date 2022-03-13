const mongoose = require("mongoose");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "add your Name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Add your Password"],
  },
  email: {
    type: String,
    required: [true, "Email address is required"],
    validate: [validateEmail, "Email validation failed"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

module.exports = mongoose.model("User", UserSchema);
