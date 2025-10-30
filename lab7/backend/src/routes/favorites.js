const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

// GET /api/v1/favorites - Get favorites
router.get('/', async (req, res, next) => {
  try {
    const { Favorite, Product } = require('../models');
    const favorites = await Favorite.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product, as: 'product' }]
    });
    res.json({ success: true, data: favorites });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/favorites - Add to favorites
router.post('/', async (req, res, next) => {
  try {
    const { Favorite } = require('../models');
    const { productId } = req.body;
    
    const [favorite, created] = await Favorite.findOrCreate({
      where: { userId: req.user.id, productId }
    });
    
    res.json({
      success: true,
      data: favorite,
      message: created ? 'Добавлено в избранное' : 'Уже в избранном'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

