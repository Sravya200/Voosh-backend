const express = require('express');
const passport = require('passport');
const mysql = require('mysql2/promise');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'users',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes
app.use('/auth', authRoutes);
app.use('/profile', authMiddleware.authenticateToken, profileRoutes);
app.use('/admin', authMiddleware.authenticateToken, authMiddleware.isAdmin, adminRoutes);
app.use('/users', authMiddleware.authenticateToken, userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    photo BLOB,
    name VARCHAR(255),
    bio TEXT,
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true
);


*/
