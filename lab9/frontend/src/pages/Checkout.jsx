import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createOrder } from '../api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Checkout.css'

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    shippingAddress: '',
    phone: user?.phone || '',
    comment: ''
  })

  if (!isAuthenticated) {
    return (
      <div className="empty-state">
        <h3>Войдите в аккаунт</h3>
        <p>Для оформления заказа необходимо авторизоваться</p>
        <Link to="/login" className="btn btn-primary mt-2">Войти</Link>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="empty-state">
        <h3>Корзина пуста</h3>
        <p>Добавьте товары для оформления заказа</p>
        <Link to="/catalog" className="btn btn-primary mt-2">Перейти в каталог</Link>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.shippingAddress || !form.phone) {
      alert('Заполните все обязательные поля')
      return
    }

    setLoading(true)
    try {
      const res = await createOrder(form)
      await clearCart()
      navigate(`/orders?success=${res.data.orderId}`)
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка при оформлении заказа')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Оформление заказа</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Контактные данные</h3>
            <div className="form-group">
              <label className="form-label">Имя</label>
              <input 
                type="text" 
                className="form-input" 
                value={`${user?.firstName} ${user?.lastName}`}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="form-label">Телефон *</label>
              <input 
                type="tel" 
                className="form-input"
                placeholder="+375 (XX) XXX-XX-XX"
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Доставка</h3>
            <div className="form-group">
              <label className="form-label">Адрес доставки *</label>
              <textarea 
                className="form-input"
                rows="3"
                placeholder="Город, улица, дом, квартира"
                value={form.shippingAddress}
                onChange={(e) => setForm(prev => ({ ...prev, shippingAddress: e.target.value }))}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Комментарий к заказу</label>
              <textarea 
                className="form-input"
                rows="2"
                placeholder="Пожелания по доставке..."
                value={form.comment}
                onChange={(e) => setForm(prev => ({ ...prev, comment: e.target.value }))}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Оформление...' : 'Подтвердить заказ'}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Ваш заказ</h3>
          <div className="order-items">
            {cart.items.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="order-item-info">
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-qty">{item.quantity} шт.</span>
                </div>
                <span className="order-item-price">{item.price * item.quantity} BYN</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Итого:</span>
            <span>{cart.totalAmount} BYN</span>
          </div>
        </div>
      </div>
    </div>
  )
}


