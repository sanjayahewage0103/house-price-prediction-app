#!/usr/bin/env node

// Script to create an admin user for the Hometrix application
// Run with: node create-admin.js

const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("ℹ️  Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      username: "admin",
      email: "admin@hometrix.com",
      password: "admin123",
      role: "admin"
    });

    console.log("🎉 Admin user created successfully!");
    console.log("📧 Email: admin@hometrix.com");
    console.log("🔑 Password: admin123");
    console.log("⚠️  Please change the password after first login!");

  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Database connection closed");
    process.exit(0);
  }
};

createAdminUser();
