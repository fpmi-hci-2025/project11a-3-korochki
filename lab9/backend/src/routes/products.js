const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/database');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all products with filtering
router.get('/', (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, brand, inStock, sort, page = 1, limit = 20 } = req.query;
    
    let sql = 'SELECT p.*, c.name as categoryName FROM products p LEFT JOIN categories c ON p.categoryId = c.id WHERE 1=1';
    const params = [];

    if (category) {
      sql += ' AND (p.categoryId = ? OR c.slug = ?)';
      params.push(category, category);
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    if (minPrice) {
      sql += ' AND p.price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      sql += ' AND p.price <= ?';
      params.push(parseFloat(maxPrice));
    }

    if (brand) {
      sql += ' AND p.brand = ?';
      params.push(brand);
    }

    if (inStock === 'true') {
      sql += ' AND p.inStock = 1';
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        sql += ' ORDER BY p.price ASC';
        break;
      case 'price_desc':
        sql += ' ORDER BY p.price DESC';
        break;
      case 'rating':
        sql += ' ORDER BY p.rating DESC';
        break;
      case 'newest':
        sql += ' ORDER BY p.createdAt DESC';
        break;
      default:
        sql += ' ORDER BY p.createdAt DESC';
    }

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    sql += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const products = db.prepare(sql).all(...params);

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM products p LEFT JOIN categories c ON p.categoryId = c.id WHERE 1=1';
    const countParams = [];
    
    if (category) {
      countSql += ' AND (p.categoryId = ? OR c.slug = ?)';
      countParams.push(category, category);
    }
    if (search) {
      countSql += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)';
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    const { total } = db.prepare(countSql).get(...countParams);

    res.json({
      products: products.map(p => ({ ...p, specs: p.specs ? JSON.parse(p.specs) : null })),
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = db.prepare(`
      SELECT p.*, c.name as categoryName 
      FROM products p 
      LEFT JOIN categories c ON p.categoryId = c.id 
      WHERE p.id = ?
    `).get(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get reviews
    const reviews = db.prepare(`
      SELECT r.*, u.firstName, u.lastName 
      FROM reviews r 
      JOIN users u ON r.userId = u.id 
      WHERE r.productId = ? 
      ORDER BY r.createdAt DESC
    `).all(req.params.id);

    res.json({
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : null,
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create product (admin only)
router.post('/', authenticateToken, authorizeAdmin, (req, res) => {
  try {
    const { name, description, price, oldPrice, brand, imageUrl, specs, categoryId, inStock } = req.body;
    const id = uuidv4();

    db.prepare(`
      INSERT INTO products (id, name, description, price, oldPrice, brand, imageUrl, specs, categoryId, inStock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, name, description, price, oldPrice || null, brand, imageUrl, specs ? JSON.stringify(specs) : null, categoryId, inStock ? 1 : 0);

    res.status(201).json({ message: 'Product created', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product (admin only)
router.put('/:id', authenticateToken, authorizeAdmin, (req, res) => {
  try {
    const { name, description, price, oldPrice, brand, imageUrl, specs, categoryId, inStock } = req.body;

    db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, oldPrice = ?, brand = ?, imageUrl = ?, specs = ?, categoryId = ?, inStock = ?
      WHERE id = ?
    `).run(name, description, price, oldPrice, brand, imageUrl, specs ? JSON.stringify(specs) : null, categoryId, inStock ? 1 : 0, req.params.id);

    res.json({ message: 'Product updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;


