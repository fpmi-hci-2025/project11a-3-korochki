const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's orders
router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC
    `).all(req.user.id);

    const ordersWithItems = orders.map(order => {
      const items = db.prepare(`
        SELECT oi.*, p.name, p.imageUrl, p.brand
        FROM order_items oi
        JOIN products p ON oi.productId = p.id
        WHERE oi.orderId = ?
      `).all(order.id);
      return { ...order, items };
    });

    res.json({ orders: ordersWithItems });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get single order
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const items = db.prepare(`
      SELECT oi.*, p.name, p.imageUrl, p.brand
      FROM order_items oi
      JOIN products p ON oi.productId = p.id
      WHERE oi.orderId = ?
    `).all(order.id);

    res.json({ order: { ...order, items } });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Create order from cart
router.post('/', authenticateToken, (req, res) => {
  try {
    const { shippingAddress, phone, comment } = req.body;

    const cart = db.prepare('SELECT id FROM carts WHERE userId = ?').get(req.user.id);
    if (!cart) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const cartItems = db.prepare(`
      SELECT ci.*, p.price, p.name
      FROM cart_items ci
      JOIN products p ON ci.productId = p.id
      WHERE ci.cartId = ?
    `).all(cart.id);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = uuidv4();

    db.prepare(`
      INSERT INTO orders (id, userId, status, totalAmount, shippingAddress, phone, comment)
      VALUES (?, ?, 'pending', ?, ?, ?, ?)
    `).run(orderId, req.user.id, totalAmount, shippingAddress, phone, comment);

    const insertItem = db.prepare(`
      INSERT INTO order_items (id, orderId, productId, quantity, price)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const item of cartItems) {
      insertItem.run(uuidv4(), orderId, item.productId, item.quantity, item.price);
    }

    // Clear cart
    db.prepare('DELETE FROM cart_items WHERE cartId = ?').run(cart.id);

    res.status(201).json({ 
      message: 'Order created successfully',
      orderId,
      totalAmount
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Cancel order
router.put('/:id/cancel', authenticateToken, (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Cannot cancel this order' });
    }

    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run('cancelled', req.params.id);
    res.json({ message: 'Order cancelled' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

module.exports = router;


