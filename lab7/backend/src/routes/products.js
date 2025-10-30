const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: decimal
 *         oldPrice:
 *           type: number
 *           format: decimal
 *         brand:
 *           type: string
 *         imageUrl:
 *           type: string
 *         specs:
 *           type: object
 *         inStock:
 *           type: boolean
 *         rating:
 *           type: number
 *         reviewsCount:
 *           type: integer
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получить список товаров
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество товаров на странице
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: ID категории
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Поисковый запрос
 *     responses:
 *       200:
 *         description: Список товаров успешно получен
 */
router.get('/', async (req, res, next) => {
  try {
    const { Product } = require('../models');
    const { Op } = require('sequelize');
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    const where = {};
    
    // Filter by category
    if (req.query.category) {
      where.categoryId = req.query.category;
    }
    
    // Search
    if (req.query.search) {
      where.name = {
        [Op.iLike]: `%${req.query.search}%`
      };
    }
    
    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      data: {
        products,
        pagination: {
          total: count,
          page,
          pages: Math.ceil(count / limit),
          limit
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Товар найден
 *       404:
 *         description: Товар не найден
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { Product, Review, Category } = require('../models');
    
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { 
          model: Review, 
          as: 'reviews',
          limit: 5,
          order: [['createdAt', 'DESC']]
        }
      ]
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Товар не найден'
        }
      });
    }
    
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создать новый товар (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Недостаточно прав
 */
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { Product } = require('../models');
    
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product,
      message: 'Товар успешно создан'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Обновить товар (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Товар обновлён
 */
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { Product } = require('../models');
    
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Товар не найден'
        }
      });
    }
    
    await product.update(req.body);
    
    res.json({
      success: true,
      data: product,
      message: 'Товар успешно обновлён'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Удалить товар (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Товар удалён
 */
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { Product } = require('../models');
    
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Товар не найден'
        }
      });
    }
    
    await product.destroy();
    
    res.json({
      success: true,
      message: 'Товар успешно удалён'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

