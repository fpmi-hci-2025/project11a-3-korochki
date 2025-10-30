const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/config/database');
const { Product, Category } = require('../src/models');

describe('Products API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /api/v1/products', () => {
    beforeEach(async () => {
      await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 999.99,
        brand: 'TestBrand',
        inStock: true
      });
    });

    afterEach(async () => {
      await Product.destroy({ where: {} });
    });

    it('should return list of products', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.products).toBeInstanceOf(Array);
      expect(response.body.data.products.length).toBeGreaterThan(0);
    });

    it('should return pagination info', async () => {
      const response = await request(app)
        .get('/api/v1/products?page=1&limit=10')
        .expect(200);

      expect(response.body.data.pagination).toBeDefined();
      expect(response.body.data.pagination).toHaveProperty('page');
      expect(response.body.data.pagination).toHaveProperty('total');
      expect(response.body.data.pagination).toHaveProperty('pages');
    });

    it('should filter products by search query', async () => {
      const response = await request(app)
        .get('/api/v1/products?search=Test')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.products[0].name).toContain('Test');
    });
  });

  describe('GET /api/v1/products/:id', () => {
    let testProduct;

    beforeEach(async () => {
      testProduct = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 999.99,
        brand: 'TestBrand',
        inStock: true
      });
    });

    afterEach(async () => {
      await Product.destroy({ where: {} });
    });

    it('should return a product by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/products/${testProduct.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test Product');
      expect(response.body.data.price).toBe('999.99');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .get(`/api/v1/products/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('POST /api/v1/products', () => {
    it('should create a new product (admin only)', async () => {
      // Note: This would require authentication
      // For demonstration purposes only
      const newProduct = {
        name: 'New Product',
        description: 'New Description',
        price: 1499.99,
        brand: 'NewBrand',
        inStock: true
      };

      // This test would need a valid admin token
      // Skipping auth for example purposes
    });
  });
});

