const express = require('express');
const db = require('../db/database');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// All routes require admin access
router.use(authenticateToken, authorizeAdmin);

// Get all users
router.get('/users', (req, res) => {
  try {
    const users = db.prepare(`
      SELECT id, email, firstName, lastName, phone, role, createdAt
      FROM users
      ORDER BY createdAt DESC
    `).all();

    // Get order count for each user
    const usersWithStats = users.map(user => {
      const orderStats = db.prepare(`
        SELECT COUNT(*) as orderCount, COALESCE(SUM(totalAmount), 0) as totalSpent
        FROM orders WHERE userId = ?
      `).get(user.id);
      
      return { ...user, ...orderStats };
    });

    res.json({ users: usersWithStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get single user details
router.get('/users/:id', (req, res) => {
  try {
    const user = db.prepare(`
      SELECT id, email, firstName, lastName, phone, role, createdAt
      FROM users WHERE id = ?
    `).get(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orders = db.prepare(`
      SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC
    `).all(req.params.id);

    const reviews = db.prepare(`
      SELECT r.*, p.name as productName
      FROM reviews r
      JOIN products p ON r.productId = p.id
      WHERE r.userId = ?
      ORDER BY r.createdAt DESC
    `).all(req.params.id);

    res.json({ user, orders, reviews });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user role
router.put('/users/:id/role', (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin', 'courier'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, req.params.id);
    res.json({ message: 'Role updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

// Delete user
router.delete('/users/:id', (req, res) => {
  try {
    // Don't allow deleting yourself
    if (req.params.id === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete yourself' });
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Get all orders (admin view)
router.get('/orders', (req, res) => {
  try {
    const { status } = req.query;
    
    let sql = `
      SELECT o.*, u.email, u.firstName, u.lastName
      FROM orders o
      JOIN users u ON o.userId = u.id
    `;
    const params = [];

    if (status) {
      sql += ' WHERE o.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY o.createdAt DESC';

    const orders = db.prepare(sql).all(...params);

    const ordersWithItems = orders.map(order => {
      const items = db.prepare(`
        SELECT oi.*, p.name, p.imageUrl
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

// Update order status
router.put('/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ message: 'Order status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Get all couriers with their stats
router.get('/couriers', (req, res) => {
  try {
    const couriers = db.prepare(`
      SELECT id, email, firstName, lastName, phone, createdAt
      FROM users WHERE role = 'courier'
      ORDER BY createdAt DESC
    `).all();

    const couriersWithStats = couriers.map(courier => {
      const stats = db.prepare(`
        SELECT 
          COUNT(CASE WHEN status IN ('processing', 'shipped') THEN 1 END) as activeOrders,
          COUNT(CASE WHEN status = 'delivered' THEN 1 END) as deliveredOrders,
          COUNT(*) as totalOrders
        FROM orders WHERE courierId = ?
      `).get(courier.id);

      const currentOrders = db.prepare(`
        SELECT o.id, o.status, o.shippingAddress, o.totalAmount, o.createdAt,
               u.firstName as customerFirstName, u.lastName as customerLastName
        FROM orders o
        JOIN users u ON o.userId = u.id
        WHERE o.courierId = ? AND o.status IN ('processing', 'shipped')
        ORDER BY o.createdAt DESC
      `).all(courier.id);

      return { 
        ...courier, 
        ...stats,
        earnings: (stats.deliveredOrders || 0) * 5,
        currentOrders 
      };
    });

    res.json({ couriers: couriersWithStats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch couriers' });
  }
});

// Get dashboard stats
router.get('/stats', (req, res) => {
  try {
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const reviewCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get().count;
    
    const revenue = db.prepare(`
      SELECT COALESCE(SUM(totalAmount), 0) as total 
      FROM orders WHERE status != 'cancelled'
    `).get().total;

    const recentOrders = db.prepare(`
      SELECT o.*, u.firstName, u.lastName
      FROM orders o
      JOIN users u ON o.userId = u.id
      ORDER BY o.createdAt DESC
      LIMIT 5
    `).all();

    const ordersByStatus = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM orders
      GROUP BY status
    `).all();

    res.json({
      stats: {
        users: userCount,
        products: productCount,
        orders: orderCount,
        reviews: reviewCount,
        revenue: Math.round(revenue * 100) / 100
      },
      recentOrders,
      ordersByStatus
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;

