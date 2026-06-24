const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// GET recent activities (latest 10)
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;