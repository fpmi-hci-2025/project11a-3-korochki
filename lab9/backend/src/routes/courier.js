const express = require('express');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Middleware to check courier role
const authorizeCourier = (req, res, next) => {
  if (req.user.role !== 'courier' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Courier access required' });
  }
  next();
};

router.use(authenticateToken, authorizeCourier);

// Get courier's assigned orders
router.get('/orders', (req, res) => {
  try {
    const { status } = req.query;
    
    let sql = `
      SELECT o.*, u.firstName as customerFirstName, u.lastName as customerLastName, u.phone as customerPhone
      FROM orders o
      JOIN users u ON o.userId = u.id
      WHERE o.courierId = ?
    `;
    const params = [req.user.id];

    if (status) {
      sql += ' AND o.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY o.createdAt DESC';

    const orders = db.prepare(sql).all(...params);

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
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get available orders (not assigned to any courier)
router.get('/available', (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.*, u.firstName as customerFirstName, u.lastName as customerLastName, u.phone as customerPhone
      FROM orders o
      JOIN users u ON o.userId = u.id
      WHERE o.courierId IS NULL AND o.status IN ('processing', 'pending')
      ORDER BY o.createdAt ASC
    `).all();

    const ordersWithItems = orders.map(order => {
      const items = db.prepare(`
        SELECT oi.*, p.name, p.imageUrl, p.brand
        FROM order_items oi
        JOIN products p ON oi.productId = p.id
        WHERE oi.orderId = ?
      `).all(order.id);
      
      const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
      return { ...order, items, itemCount };
    });

    res.json({ orders: ordersWithItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch available orders' });
  }
});

// Accept order for delivery
router.post('/orders/:id/accept', (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.courierId && order.courierId !== req.user.id) {
      return res.status(400).json({ error: 'Order already assigned to another courier' });
    }

    // Calculate estimated delivery (2 hours from now)
    const estimatedDelivery = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    db.prepare(`
      UPDATE orders 
      SET courierId = ?, status = 'processing', estimatedDelivery = ?
      WHERE id = ?
    `).run(req.user.id, estimatedDelivery, req.params.id);

    res.json({ message: 'Order accepted', estimatedDelivery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to accept order' });
  }
});

// Update order status (courier can mark as shipped or delivered)
router.put('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['shipped', 'delivered'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Courier can only set shipped or delivered status' });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND courierId = ?').get(req.params.id, req.user.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found or not assigned to you' });
    }

    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Release order (unassign from courier)
router.post('/orders/:id/release', (req, res) => {
  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ? AND courierId = ?').get(req.params.id, req.user.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found or not assigned to you' });
    }

    if (order.status === 'delivered') {
      return res.status(400).json({ error: 'Cannot release delivered order' });
    }

    db.prepare(`
      UPDATE orders SET courierId = NULL, status = 'pending', estimatedDelivery = NULL WHERE id = ?
    `).run(req.params.id);

    res.json({ message: 'Order released' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to release order' });
  }
});

// Get courier stats
router.get('/stats', (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const totalDelivered = db.prepare(`
      SELECT COUNT(*) as count FROM orders WHERE courierId = ? AND status = 'delivered'
    `).get(req.user.id).count;

    const todayDelivered = db.prepare(`
      SELECT COUNT(*) as count FROM orders 
      WHERE courierId = ? AND status = 'delivered' AND date(createdAt) = date(?)
    `).get(req.user.id, today).count;

    const activeOrders = db.prepare(`
      SELECT COUNT(*) as count FROM orders 
      WHERE courierId = ? AND status IN ('processing', 'shipped')
    `).get(req.user.id).count;

    const earnings = db.prepare(`
      SELECT COUNT(*) * 5 as total FROM orders WHERE courierId = ? AND status = 'delivered'
    `).get(req.user.id).total; // 5 BYN per delivery

    res.json({
      stats: {
        totalDelivered,
        todayDelivered,
        activeOrders,
        earnings
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;


