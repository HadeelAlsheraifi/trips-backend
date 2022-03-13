const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const TripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: String,
    image: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

TripSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=title%>" });
module.exports = mongoose.model("Trip", TripSchema);
