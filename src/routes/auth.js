const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
});

// OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = generateToken(req.user);
  res.json({ token });
});

// Add routes for other OAuth providers (Facebook, Twitter, GitHub)

// Logout
router.post('/logout', (req, res) => {
  // Clear session or token
  res.json({ message: 'Logged out successfully' });
});

// Helper function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, 'your_secret_key');
}

module.exports = router;
