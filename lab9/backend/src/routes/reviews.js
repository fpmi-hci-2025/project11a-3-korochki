const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get reviews for product
router.get('/product/:productId', (req, res) => {
  try {
    const reviews = db.prepare(`
      SELECT r.*, u.firstName, u.lastName
      FROM reviews r
      JOIN users u ON r.userId = u.id
      WHERE r.productId = ?
      ORDER BY r.createdAt DESC
    `).all(req.params.productId);

    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add review
router.post('/', authenticateToken, (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid review data' });
    }

    const existing = db.prepare('SELECT id FROM reviews WHERE productId = ? AND userId = ?').get(productId, req.user.id);
    if (existing) {
      return res.status(400).json({ error: 'You already reviewed this product' });
    }

    const id = uuidv4();
    db.prepare(`
      INSERT INTO reviews (id, productId, userId, rating, title, comment)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, productId, req.user.id, rating, title, comment);

    // Update product rating
    const stats = db.prepare(`
      SELECT AVG(rating) as avgRating, COUNT(*) as count FROM reviews WHERE productId = ?
    `).get(productId);

    db.prepare('UPDATE products SET rating = ?, reviewsCount = ? WHERE id = ?').run(
      Math.round(stats.avgRating * 10) / 10,
      stats.count,
      productId
    );

    res.status(201).json({ message: 'Review added', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// Delete review
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const review = db.prepare('SELECT * FROM reviews WHERE id = ? AND userId = ?').get(req.params.id, req.user.id);
    
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    db.prepare('DELETE FROM reviews WHERE id = ?').run(req.params.id);

    // Update product rating
    const stats = db.prepare(`
      SELECT AVG(rating) as avgRating, COUNT(*) as count FROM reviews WHERE productId = ?
    `).get(review.productId);

    db.prepare('UPDATE products SET rating = ?, reviewsCount = ? WHERE id = ?').run(
      stats.avgRating || 0,
      stats.count,
      review.productId
    );

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

module.exports = router;


