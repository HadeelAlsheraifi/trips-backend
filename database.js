const mongoose = require("mongoose");

const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const DATABASE_NAME = process.env.DATABASE_NAME;
  console.log("Env varibales: ", { PASSWORD, DATABASE_NAME });
  const CONNNECTION_URL = `mongodb+srv://CodedOne:${PASSWORD}@coded.h9agm.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

  const conn = await mongoose.connect(CONNNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};
module.exports = connectDB;
