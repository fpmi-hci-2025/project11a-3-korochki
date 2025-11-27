import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Cart.css'

export default function Cart() {
  const { cart, updateQuantity, removeItem, loading } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return (
      <div className="empty-state">
        <h3>Войдите в аккаунт</h3>
        <p>Для просмотра корзины необходимо авторизоваться</p>
        <Link to="/login" className="btn btn-primary mt-2">Войти</Link>
      </div>
    )
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>

  if (cart.items.length === 0) {
    return (
      <div className="empty-state">
        <h3>Корзина пуста</h3>
        <p>Добавьте товары из каталога</p>
        <Link to="/catalog" className="btn btn-primary mt-2">Перейти в каталог</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Корзина</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-info">
                <Link to={`/product/${item.productId}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-brand">{item.brand}</span>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <div className="cart-item-price">
                {item.price * item.quantity} BYN
              </div>

              <button 
                className="cart-item-remove"
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Итого</h3>
          <div className="summary-row">
            <span>Товаров:</span>
            <span>{cart.items.reduce((sum, i) => sum + i.quantity, 0)} шт.</span>
          </div>
          <div className="summary-row total">
            <span>Сумма:</span>
            <span>{cart.totalAmount} BYN</span>
          </div>
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/checkout')}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  )
}


