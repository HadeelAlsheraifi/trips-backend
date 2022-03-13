const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

/// Sign in
exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const passwordMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (passwordMatch) return done(null, user);
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

//check for the Authentication
exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    if (Date.now() > payload.exp * 10000) {
      return done(null, false);
    }
    try {
      const user = await User.findById(payload._id);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
