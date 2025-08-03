const express = require("express");
const {
  predictHousePrice,
  getMyPredictions,
  getAllPredictions,
} = require("../controllers/predictController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, predictHousePrice);
router.get("/mine", protect, getMyPredictions);
router.get("/all", protect, adminOnly, getAllPredictions);

module.exports = router;
