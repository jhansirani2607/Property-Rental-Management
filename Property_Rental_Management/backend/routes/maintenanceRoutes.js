const express = require("express");
const router = express.Router();
const Maintenance = require("../models/Maintenance");
const Activity = require("../models/Activity");
// GET all maintenance requests
router.get("/", async (req, res) => {
  try {
    const requests = await Maintenance.find().sort({ _id: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new maintenance request
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newRequest = new Maintenance({ title, description });
    const savedRequest = await newRequest.save();

    await Activity.create({
      message: `Maintenance Request Submitted - ${savedRequest.title}`,
      type: "maintenance",
      icon: "🛠",
    });

    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - mark as completed by removing the request
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Maintenance.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request marked as completed and removed", deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;