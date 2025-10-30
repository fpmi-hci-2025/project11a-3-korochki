const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Review = require('./Review');
const Favorite = require('./Favorite');

// Define relationships

// User relationships
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });

// Product relationships
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
Product.hasMany(Review, { foreignKey: 'productId', as: 'reviews' });
Product.hasMany(Favorite, { foreignKey: 'productId', as: 'favorites' });

// Category relationships
Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Category.belongsTo(Category, { foreignKey: 'parentId', as: 'parent' });
Category.hasMany(Category, { foreignKey: 'parentId', as: 'children' });

// Cart relationships
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });

// CartItem relationships
CartItem.belongsTo(Cart, { foreignKey: 'cartId', as: 'cart' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Order relationships
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });

// OrderItem relationships
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Review relationships
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Review.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Favorite relationships
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Favorite.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  User,
  Product,
  Category,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Review,
  Favorite
};

