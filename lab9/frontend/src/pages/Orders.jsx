import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getOrders } from '../api'
import { useAuth } from '../context/AuthContext'
import './Orders.css'

const statusLabels = {
  pending: { text: 'В обработке', class: 'badge-warning' },
  processing: { text: 'Собирается', class: 'badge-primary' },
  shipped: { text: 'Отправлен', class: 'badge-primary' },
  delivered: { text: 'Доставлен', class: 'badge-success' },
  cancelled: { text: 'Отменён', class: 'badge-danger' }
}

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const [searchParams] = useSearchParams()
  const successOrderId = searchParams.get('success')

  useEffect(() => {
    if (isAuthenticated) {
      getOrders()
        .then(res => setOrders(res.data.orders))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="empty-state">
        <h3>Войдите в аккаунт</h3>
        <p>Для просмотра заказов необходимо авторизоваться</p>
        <Link to="/login" className="btn btn-primary mt-2">Войти</Link>
      </div>
    )
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>

  return (
    <div className="orders-page">
      <h1 className="page-title">Мои заказы</h1>

      {successOrderId && (
        <div className="success-message">
          ✅ Заказ успешно оформлен! Номер заказа: {successOrderId.slice(0, 8)}...
        </div>
      )}

      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>Заказов пока нет</h3>
          <p>Оформите первый заказ в нашем каталоге</p>
          <Link to="/catalog" className="btn btn-primary mt-2">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <span className="order-id">Заказ #{order.id.slice(0, 8)}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <span className={`badge ${statusLabels[order.status]?.class}`}>
                  {statusLabels[order.status]?.text}
                </span>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="order-item-info">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">{item.quantity} × {item.price} BYN</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-address">
                  📍 {order.shippingAddress}
                </div>
                <div className="order-total">
                  Итого: <strong>{order.totalAmount} BYN</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


