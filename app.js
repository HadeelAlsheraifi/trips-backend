const express = require("express");
const tripsRouter = require("./Trips/trip.route"); // dotenv usage: access the enviroumnet varible
const dotenv = require("dotenv");
dotenv.config(); // add database connetion
const connectDB = require("./database");
const passport = require("passport");
const upload = require("./middleware/multer");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const userRouter = require("./User/user.route");
const profileRouter = require("./Profile/profile.route");
const app = express();
app.use(express.json()); //usage: to parse data from request on apis

//middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  console.log(req.body);
  next();
});

//routes
app.use("", userRouter);
// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use("/trips", tripsRouter);
app.use("/profiles", profileRouter);

//handling Error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is working ${PORT}`);
  connectDB();
});
