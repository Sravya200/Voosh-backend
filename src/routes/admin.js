const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/profiles', async (req, res) => {
  try {
    const profiles = await User.getAllProfiles();
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
