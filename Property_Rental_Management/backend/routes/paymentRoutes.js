const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Activity = require("../models/Activity");

// GET all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().sort({ _id: 1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new payment record
router.post("/", async (req, res) => {
  try {
    const { month, amount, status } = req.body;

    if (!month || !amount) {
      return res.status(400).json({ message: "Month and amount are required" });
    }

    const paymentDate =
      status === "Paid" ? new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) : "-";

    const newPayment = new Payment({
      month,
      amount,
      status: status || "Pending",
      paymentDate,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH - mark a payment as Paid
router.patch("/:id", async (req, res) => {
  try {
    const paymentDate = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: "Paid", paymentDate },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Payment not found" });
    }

    await Activity.create({
      message: `Rent Payment Received - ${updated.month}`,
      type: "payment",
      icon: "💰",
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE a payment record
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;