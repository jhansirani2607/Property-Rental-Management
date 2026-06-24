const Property = require("../models/Property");
const Activity = require("../models/Activity");
const Maintenance = require("../models/Maintenance");

// Add Property
const addProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    await Activity.create({
      message: `New Property Added - ${property.title}`,
      type: "property",
      icon: "✅",
    });

    res.status(201).json({
      success: true,
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get ALL properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const properties = await Property.find();
    const pendingMaintenanceCount = await Maintenance.countDocuments();

    res.status(200).json({
      totalProperties: properties.length,
      rentedProperties: properties.filter(p => p.status === "Rented").length,
      availableProperties: properties.filter(p => p.status === "Available").length,
      recentProperties: properties.slice(-5).reverse(),
      pendingMaintenanceCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProperty = async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      property: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addProperty,
  getAllProperties,
  getDashboardStats,
  getPropertyById,
  updateProperty,
  deleteProperty,
};