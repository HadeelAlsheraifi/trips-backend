const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
  bio: {
    type: String,
  },

  image: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
});

module.exports = mongoose.model("Profile", ProfileSchema);
