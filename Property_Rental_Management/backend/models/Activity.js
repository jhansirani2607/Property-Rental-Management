const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["property", "payment", "maintenance"],
      required: true,
    },
    icon: {
      type: String,
      default: "📌",
    },
  },
  { timestamps: true } // adds createdAt automatically
);

module.exports = mongoose.model("Activity", activitySchema);