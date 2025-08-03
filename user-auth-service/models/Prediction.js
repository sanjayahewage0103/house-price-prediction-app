const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    features: {
      type: Object, // or use Schema.Types.Mixed
      required: true,
    },
    prediction: {
      type: Number,
      required: true,
    },
    interval_lower: Number,
    interval_upper: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
