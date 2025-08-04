// MongoDB initialization script
db = db.getSiblingDB('hometrix');

// Create collections
db.createCollection('users');
db.createCollection('predictions');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.predictions.createIndex({ "userId": 1 });
db.predictions.createIndex({ "createdAt": 1 });

// Insert sample admin user (password: admin123)
db.users.insertOne({
  username: "admin",
  email: "admin@hometrix.com",
  password: "$2b$10$8K1p/a9TnmYIGa7D2qUNUuVzXzFhqgGq8L5dNg7xLx4QjYzJ6YjH.",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
});

print("Database initialized successfully!");
