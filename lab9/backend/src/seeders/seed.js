const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('../db/database');

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  db.exec('DELETE FROM reviews');
  db.exec('DELETE FROM order_items');
  db.exec('DELETE FROM orders');
  db.exec('DELETE FROM cart_items');
  db.exec('DELETE FROM carts');
  db.exec('DELETE FROM favorites');
  db.exec('DELETE FROM products');
  db.exec('DELETE FROM categories');
  db.exec('DELETE FROM users');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const adminId = uuidv4();
  db.prepare(`
    INSERT INTO users (id, email, password, firstName, lastName, role)
    VALUES (?, 'admin@technomart.by', ?, 'Admin', 'User', 'admin')
  `).run(adminId, adminPassword);

  // Create test user
  const userPassword = await bcrypt.hash('user123', 10);
  const userId = uuidv4();
  db.prepare(`
    INSERT INTO users (id, email, password, firstName, lastName, phone, role)
    VALUES (?, 'user@test.com', ?, 'Иван', 'Петров', '+375291234567', 'user')
  `).run(userId, userPassword);

  // Create cart for test user
  db.prepare('INSERT INTO carts (id, userId) VALUES (?, ?)').run(uuidv4(), userId);

  // Create courier user
  const courierPassword = await bcrypt.hash('courier123', 10);
  const courierId = uuidv4();
  db.prepare(`
    INSERT INTO users (id, email, password, firstName, lastName, phone, role)
    VALUES (?, 'courier@technomart.by', ?, 'Алексей', 'Курьеров', '+375291111111', 'courier')
  `).run(courierId, courierPassword);

  // Create cart for courier (in case they want to order)
  db.prepare('INSERT INTO carts (id, userId) VALUES (?, ?)').run(uuidv4(), courierId);

  // Categories
  const categories = [
    { id: uuidv4(), name: 'Смартфоны', slug: 'smartphones', description: 'Мобильные телефоны и смартфоны' },
    { id: uuidv4(), name: 'Ноутбуки', slug: 'laptops', description: 'Ноутбуки и ультрабуки' },
    { id: uuidv4(), name: 'Планшеты', slug: 'tablets', description: 'Планшетные компьютеры' },
    { id: uuidv4(), name: 'Наушники', slug: 'headphones', description: 'Наушники и гарнитуры' },
    { id: uuidv4(), name: 'Телевизоры', slug: 'tvs', description: 'Телевизоры и мониторы' },
    { id: uuidv4(), name: 'Аксессуары', slug: 'accessories', description: 'Аксессуары для техники' }
  ];

  const insertCategory = db.prepare('INSERT INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)');
  for (const cat of categories) {
    insertCategory.run(cat.id, cat.name, cat.slug, cat.description);
  }

  // Products
  const products = [
    // Smartphones
    { name: 'iPhone 15 Pro Max', description: 'Флагманский смартфон Apple с чипом A17 Pro', price: 4999, oldPrice: 5299, brand: 'Apple', categorySlug: 'smartphones', rating: 4.9, reviewsCount: 156, specs: { display: '6.7" Super Retina XDR', chip: 'A17 Pro', camera: '48 MP', storage: '256 GB' } },
    { name: 'Samsung Galaxy S24 Ultra', description: 'Премиальный Android-смартфон с AI-функциями', price: 4499, oldPrice: 4799, brand: 'Samsung', categorySlug: 'smartphones', rating: 4.8, reviewsCount: 89, specs: { display: '6.8" Dynamic AMOLED 2X', chip: 'Snapdragon 8 Gen 3', camera: '200 MP', storage: '256 GB' } },
    { name: 'Xiaomi 14 Pro', description: 'Мощный смартфон с камерой Leica', price: 2999, brand: 'Xiaomi', categorySlug: 'smartphones', rating: 4.6, reviewsCount: 45, specs: { display: '6.73" LTPO AMOLED', chip: 'Snapdragon 8 Gen 3', camera: '50 MP Leica', storage: '256 GB' } },
    { name: 'Google Pixel 8 Pro', description: 'Смартфон с лучшей камерой на Android', price: 3499, brand: 'Google', categorySlug: 'smartphones', rating: 4.7, reviewsCount: 67, specs: { display: '6.7" LTPO OLED', chip: 'Tensor G3', camera: '50 MP', storage: '128 GB' } },
    
    // Laptops
    { name: 'MacBook Pro 16" M3 Max', description: 'Профессиональный ноутбук Apple', price: 9999, brand: 'Apple', categorySlug: 'laptops', rating: 4.9, reviewsCount: 78, specs: { display: '16.2" Liquid Retina XDR', chip: 'M3 Max', ram: '36 GB', storage: '512 GB SSD' } },
    { name: 'ASUS ROG Zephyrus G16', description: 'Игровой ноутбук с RTX 4090', price: 7999, oldPrice: 8499, brand: 'ASUS', categorySlug: 'laptops', rating: 4.7, reviewsCount: 34, specs: { display: '16" QHD+ 240Hz', cpu: 'Intel Core i9-14900H', gpu: 'RTX 4090', ram: '32 GB' } },
    { name: 'Dell XPS 15', description: 'Премиальный ультрабук для работы', price: 5499, brand: 'Dell', categorySlug: 'laptops', rating: 4.6, reviewsCount: 56, specs: { display: '15.6" OLED 3.5K', cpu: 'Intel Core i7-13700H', gpu: 'RTX 4060', ram: '16 GB' } },
    { name: 'Lenovo ThinkPad X1 Carbon', description: 'Бизнес-ноутбук премиум-класса', price: 4999, brand: 'Lenovo', categorySlug: 'laptops', rating: 4.8, reviewsCount: 92, specs: { display: '14" 2.8K OLED', cpu: 'Intel Core i7-1365U', ram: '16 GB', storage: '512 GB SSD' } },
    
    // Tablets
    { name: 'iPad Pro 12.9" M2', description: 'Профессиональный планшет Apple', price: 3999, brand: 'Apple', categorySlug: 'tablets', rating: 4.9, reviewsCount: 123, specs: { display: '12.9" Liquid Retina XDR', chip: 'M2', storage: '256 GB', connectivity: 'Wi-Fi + Cellular' } },
    { name: 'Samsung Galaxy Tab S9 Ultra', description: 'Флагманский Android-планшет', price: 3499, brand: 'Samsung', categorySlug: 'tablets', rating: 4.7, reviewsCount: 45, specs: { display: '14.6" Dynamic AMOLED 2X', chip: 'Snapdragon 8 Gen 2', storage: '256 GB', spen: 'S Pen included' } },
    
    // Headphones
    { name: 'AirPods Pro 2', description: 'Беспроводные наушники с активным шумоподавлением', price: 899, brand: 'Apple', categorySlug: 'headphones', rating: 4.8, reviewsCount: 234, specs: { type: 'TWS', anc: 'Active Noise Cancellation', battery: '6h + 30h case', chip: 'H2' } },
    { name: 'Sony WH-1000XM5', description: 'Лучшие полноразмерные наушники с ANC', price: 1299, oldPrice: 1499, brand: 'Sony', categorySlug: 'headphones', rating: 4.9, reviewsCount: 189, specs: { type: 'Over-ear', anc: 'Industry-leading ANC', battery: '30h', driver: '30mm' } },
    { name: 'Samsung Galaxy Buds2 Pro', description: 'Премиальные TWS-наушники Samsung', price: 699, brand: 'Samsung', categorySlug: 'headphones', rating: 4.6, reviewsCount: 78, specs: { type: 'TWS', anc: 'Intelligent ANC', battery: '5h + 18h case', codec: '24bit Hi-Fi' } },
    
    // TVs
    { name: 'LG OLED C3 65"', description: 'OLED-телевизор с идеальным чёрным', price: 5999, oldPrice: 6499, brand: 'LG', categorySlug: 'tvs', rating: 4.9, reviewsCount: 67, specs: { display: '65" OLED evo', resolution: '4K', refresh: '120Hz', hdr: 'Dolby Vision, HDR10' } },
    { name: 'Samsung QN90C 55"', description: 'Neo QLED телевизор с Mini LED', price: 4499, brand: 'Samsung', categorySlug: 'tvs', rating: 4.7, reviewsCount: 45, specs: { display: '55" Neo QLED', resolution: '4K', refresh: '144Hz', hdr: 'HDR10+, HLG' } },
    
    // Accessories
    { name: 'Apple Watch Series 9', description: 'Умные часы Apple последнего поколения', price: 1599, brand: 'Apple', categorySlug: 'accessories', rating: 4.8, reviewsCount: 156, specs: { display: '45mm Always-On Retina', chip: 'S9 SiP', sensors: 'ECG, SpO2, Temperature', battery: '18h' } },
    { name: 'Samsung Galaxy Watch 6 Classic', description: 'Премиальные смарт-часы с вращающимся безелем', price: 1299, brand: 'Samsung', categorySlug: 'accessories', rating: 4.6, reviewsCount: 67, specs: { display: '47mm Super AMOLED', chip: 'Exynos W930', sensors: 'BioActive Sensor', battery: '40h' } },
    { name: 'Anker PowerCore 26800', description: 'Мощный портативный аккумулятор', price: 199, brand: 'Anker', categorySlug: 'accessories', rating: 4.7, reviewsCount: 234, specs: { capacity: '26800 mAh', output: '3A', ports: '3x USB-A', weight: '495g' } },
    { name: 'Logitech MX Master 3S', description: 'Премиальная беспроводная мышь', price: 399, brand: 'Logitech', categorySlug: 'accessories', rating: 4.8, reviewsCount: 189, specs: { sensor: '8000 DPI', connectivity: 'Bluetooth + USB', battery: '70 days', buttons: '7' } },
    { name: 'Apple MagSafe Charger', description: 'Беспроводная зарядка MagSafe', price: 149, brand: 'Apple', categorySlug: 'accessories', rating: 4.5, reviewsCount: 312, specs: { power: '15W', compatibility: 'iPhone 12+', cable: '1m', magnetic: 'Yes' } }
  ];

  const insertProduct = db.prepare(`
    INSERT INTO products (id, name, description, price, oldPrice, brand, imageUrl, specs, inStock, rating, reviewsCount, categoryId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
  `);

  for (const product of products) {
    const category = categories.find(c => c.slug === product.categorySlug);
    const imageUrl = `https://picsum.photos/seed/${product.name.replace(/\s/g, '')}/400/400`;
    insertProduct.run(
      uuidv4(),
      product.name,
      product.description,
      product.price,
      product.oldPrice || null,
      product.brand,
      imageUrl,
      JSON.stringify(product.specs),
      product.rating,
      product.reviewsCount,
      category.id
    );
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin: admin@technomart.by / admin123');
  console.log('📧 User: user@test.com / user123');
  console.log('🚚 Courier: courier@technomart.by / courier123');
}

seed().catch(console.error);

