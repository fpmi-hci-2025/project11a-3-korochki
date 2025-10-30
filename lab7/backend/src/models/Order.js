const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_amount'
  },
  shippingAddress: {
    type: DataTypes.JSONB,
    allowNull: false,
    field: 'shipping_address',
    comment: 'JSON с адресом: { street, city, postalCode, country }'
  },
  paymentMethod: {
    type: DataTypes.ENUM('card', 'cash'),
    allowNull: false,
    field: 'payment_method'
  }
}, {
  timestamps: true,
  tableName: 'orders'
});

module.exports = Order;

