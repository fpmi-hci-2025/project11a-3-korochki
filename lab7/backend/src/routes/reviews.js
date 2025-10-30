const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// POST /api/v1/reviews - Add review
router.post('/', protect, async (req, res, next) => {
  try {
    const { Review } = require('../models');
    const { productId, rating, title, comment } = req.body;
    
    const review = await Review.create({
      productId,
      userId: req.user.id,
      rating,
      title,
      comment
    });
    
    res.status(201).json({
      success: true,
      data: review,
      message: 'Отзыв добавлен'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

