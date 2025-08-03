const express = require("express");
const { predictHousePrice } = require("../controllers/predictController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, predictHousePrice);

module.exports = router;
