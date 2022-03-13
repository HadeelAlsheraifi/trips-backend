const User = require("../models/User");
const Profile = require("../models/Profile");
// Auth Libraries
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

generateToken = (user) => {
  const payload = {
    _id: user.id,
    username: user.username,
    exp: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
createHash = async (password) => {
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await createHash(req.body.password);
    const newUser = await User.create(req.body);
    const profile = await Profile.create({
      user: newUser._id,
    });
    newUser.profile = profile._id;
    await newUser.save();
    const token = generateToken(newUser);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signin = async (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};
