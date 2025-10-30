const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// GET /api/v1/users/profile - Get current user profile
router.get('/profile', protect, async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/users/profile - Update user profile
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;
    
    await req.user.update({
      firstName,
      lastName,
      phone
    });
    
    res.json({
      success: true,
      data: req.user,
      message: 'Профиль обновлён'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

