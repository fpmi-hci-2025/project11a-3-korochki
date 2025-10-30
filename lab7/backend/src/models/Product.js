const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3, 255],
        msg: 'Название должно быть от 3 до 255 символов'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Цена не может быть отрицательной'
      }
    }
  },
  oldPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'old_price'
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image_url'
  },
  specs: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'in_stock'
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  reviewsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'reviews_count'
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'category_id',
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'products'
});

module.exports = Product;

