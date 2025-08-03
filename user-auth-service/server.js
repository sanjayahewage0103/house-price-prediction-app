const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables from .env
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const predictRoutes = require("./routes/predictRoutes");

app.use("/api/auth", authRoutes);       // /register and /login
app.use("/api/users", userRoutes);      // /me
app.use("/api/predict", predictRoutes); // prediction route (POST)

// Test route (optional)
app.get("/", (req, res) => {
  res.send("User Auth Service is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
