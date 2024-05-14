const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get profile details
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update profile
router.put('/', async (req, res) => {
  try {
    const { photo, name, bio, phone, email, password } = req.body;
    await User.updateProfile(req.user.id, { photo, name, bio, phone, email, password });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Set profile visibility (public or private)
router.put('/visibility', async (req, res) => {
  try {
    const { isPublic } = req.body;
    await User.setProfileVisibility(req.user.id, isPublic);
    res.json({ message: 'Profile visibility updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Upload photo or provide image URL
router.post('/photo', async (req, res) => {
  try {
    const { photo } = req.body;
    await User.updateProfile(req.user.id, { photo });
    res.json({ message: 'Photo uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
