const express = require('express');
const router = express.Router();

// GET /api/v1/categories - Get all categories
router.get('/', async (req, res, next) => {
  try {
    const { Category } = require('../models');
    const categories = await Category.findAll({
      include: [{ model: Category, as: 'children' }]
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

