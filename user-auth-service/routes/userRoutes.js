const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET /api/users/me
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
