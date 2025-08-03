const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ This must be here:
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Basic route to check server
app.get("/", (req, res) => {
  res.send("User Auth Service is running...");
});


// ✅ Mount routes
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);



// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
