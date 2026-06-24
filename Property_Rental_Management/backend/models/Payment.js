const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  paymentDate: {
    type: String,
    default: "-",
  },
});

module.exports = mongoose.model("Payment", paymentSchema);