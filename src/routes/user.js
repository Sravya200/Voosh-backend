const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all public user profiles
router.get('/', async (req, res) => {
  try {
    const publicProfiles = await User.getAllPublicProfiles();
    res.json(publicProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user profile by ID
router.get('/:userId', async (req, res) => {
  try {
    const userProfile = await User.findById(req.params.userId);
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
