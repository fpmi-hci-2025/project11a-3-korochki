const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    let cart = db.prepare('SELECT * FROM carts WHERE userId = ?').get(req.user.id);
    
    if (!cart) {
      const cartId = uuidv4();
      db.prepare('INSERT INTO carts (id, userId) VALUES (?, ?)').run(cartId, req.user.id);
      cart = { id: cartId, userId: req.user.id };
    }

    const items = db.prepare(`
      SELECT ci.*, p.name, p.price, p.imageUrl, p.brand, p.inStock
      FROM cart_items ci
      JOIN products p ON ci.productId = p.id
      WHERE ci.cartId = ?
    `).all(cart.id);

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({ cart: { ...cart, items, totalAmount } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/items', authenticateToken, (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    let cart = db.prepare('SELECT * FROM carts WHERE userId = ?').get(req.user.id);
    if (!cart) {
      const cartId = uuidv4();
      db.prepare('INSERT INTO carts (id, userId) VALUES (?, ?)').run(cartId, req.user.id);
      cart = { id: cartId };
    }

    const existingItem = db.prepare('SELECT * FROM cart_items WHERE cartId = ? AND productId = ?').get(cart.id, productId);

    if (existingItem) {
      db.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?').run(quantity, existingItem.id);
    } else {
      db.prepare('INSERT INTO cart_items (id, cartId, productId, quantity) VALUES (?, ?, ?, ?)').run(uuidv4(), cart.id, productId, quantity);
    }

    res.json({ message: 'Item added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update cart item quantity
router.put('/items/:itemId', authenticateToken, (req, res) => {
  try {
    const { quantity } = req.body;

    if (quantity <= 0) {
      db.prepare('DELETE FROM cart_items WHERE id = ?').run(req.params.itemId);
    } else {
      db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(quantity, req.params.itemId);
    }

    res.json({ message: 'Cart updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
});

// Remove item from cart
router.delete('/items/:itemId', authenticateToken, (req, res) => {
  try {
    db.prepare('DELETE FROM cart_items WHERE id = ?').run(req.params.itemId);
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// Clear cart
router.delete('/', authenticateToken, (req, res) => {
  try {
    const cart = db.prepare('SELECT id FROM carts WHERE userId = ?').get(req.user.id);
    if (cart) {
      db.prepare('DELETE FROM cart_items WHERE cartId = ?').run(cart.id);
    }
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;


