const express = require("express");
const router = express.Router();

const {
  addProperty,
  getAllProperties,
  getDashboardStats,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

// CREATE
router.post("/", addProperty);

// READ ALL
router.get("/", getAllProperties);

// DASHBOARD
router.get("/dashboard", getDashboardStats);

// 🔥 IMPORTANT: ADD THESE MISSING ROUTES

// READ ONE
router.get("/:id", getPropertyById);

// UPDATE
router.put("/:id", updateProperty);

// DELETE
router.delete("/:id", deleteProperty);

module.exports = router;