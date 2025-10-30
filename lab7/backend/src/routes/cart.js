const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// GET /api/v1/cart - Get user cart
router.get('/', async (req, res, next) => {
  try {
    const { Cart, CartItem, Product } = require('../models');
    
    let cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }]
    });
    
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id });
    }
    
    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/cart/items - Add item to cart
router.post('/items', async (req, res, next) => {
  try {
    const { Cart, CartItem, Product } = require('../models');
    const { productId, quantity = 1 } = req.body;
    
    let cart = await Cart.findOne({ where: { userId: req.user.id } });
    if (!cart) {
      cart = await Cart.create({ userId: req.user.id });
    }
    
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Товар не найден' }
      });
    }
    
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: { quantity, price: product.price }
    });
    
    if (!created) {
      await cartItem.update({ quantity: cartItem.quantity + quantity });
    }
    
    res.json({
      success: true,
      data: cartItem,
      message: 'Товар добавлен в корзину'
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/v1/cart/items/:id - Update cart item quantity
router.put('/items/:id', async (req, res, next) => {
  try {
    const { CartItem } = require('../models');
    const { quantity } = req.body;
    
    const cartItem = await CartItem.findByPk(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Товар в корзине не найден' }
      });
    }
    
    await cartItem.update({ quantity });
    
    res.json({
      success: true,
      data: cartItem,
      message: 'Количество обновлено'
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/v1/cart/items/:id - Remove item from cart
router.delete('/items/:id', async (req, res, next) => {
  try {
    const { CartItem } = require('../models');
    
    const cartItem = await CartItem.findByPk(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Товар в корзине не найден' }
      });
    }
    
    await cartItem.destroy();
    
    res.json({
      success: true,
      message: 'Товар удалён из корзины'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

