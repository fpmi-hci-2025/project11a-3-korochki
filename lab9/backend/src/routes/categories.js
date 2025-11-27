const express = require('express');
const db = require('../db/database');

const router = express.Router();

// Get all categories
router.get('/', (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY name').all();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get category by slug
router.get('/:slug', (req, res) => {
  try {
    const category = db.prepare('SELECT * FROM categories WHERE slug = ? OR id = ?').get(req.params.slug, req.params.slug);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const products = db.prepare('SELECT * FROM products WHERE categoryId = ?').all(category.id);
    
    res.json({ category, products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

module.exports = router;


