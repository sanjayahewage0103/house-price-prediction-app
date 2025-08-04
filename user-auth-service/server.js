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

// Health check endpoint for Docker
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "auth-service",
    version: "1.0.0"
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
