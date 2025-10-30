const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.use(protect);

// GET /api/v1/orders - Get user orders
router.get('/', async (req, res, next) => {
  try {
    const { Order } = require('../models');
    const orders = await Order.findAll({ where: { userId: req.user.id } });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
});

// POST /api/v1/orders - Create order
router.post('/', async (req, res, next) => {
  try {
    const { Order, Cart, CartItem } = require('../models');
    const { shippingAddress, paymentMethod } = req.body;
    
    const cart = await Cart.findOne({
      where: { userId: req.user.id },
      include: [{ model: CartItem, as: 'items' }]
    });
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'EMPTY_CART', message: 'Корзина пуста' }
      });
    }
    
    const totalAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const order = await Order.create({
      userId: req.user.id,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'pending'
    });
    
    res.status(201).json({
      success: true,
      data: order,
      message: 'Заказ создан'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

