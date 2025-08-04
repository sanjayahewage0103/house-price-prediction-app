const axios = require("axios");
const Prediction = require("../models/Prediction");

// POST /api/predict
exports.predictHousePrice = async (req, res) => {
  const userId = req.user._id;
  const features = req.body;

  try {
    // Forward input to Flask API
    const response = await axios.post("http://localhost:5002/predict", features);

    const { prediction, interval_lower, interval_upper } = response.data;

    // Save prediction + input to DB
    const saved = await Prediction.create({
      user: userId,
      features,
      prediction,
      interval_lower,
      interval_upper,
    });

    res.status(201).json(saved);
  } catch (err) {
    console.error("Prediction error:", err.message);
    res.status(500).json({ message: "Prediction failed", error: err.message });
  }
};

// GET /api/predict/mine
exports.getMyPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your predictions", error: error.message });
  }
};

// GET /api/predict/all (admin only)
exports.getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({})
      .populate("user", "username email role")
      .sort({ createdAt: -1 });

    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all predictions", error: error.message });
  }
};
