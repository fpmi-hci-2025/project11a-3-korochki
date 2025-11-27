import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCourierStats, getCourierOrders, getAvailableOrders, acceptOrder, updateCourierOrderStatus, releaseOrder } from '../api'
import { useAuth } from '../context/AuthContext'
import './Courier.css'

const statusLabels = {
  pending: { text: 'Ожидает', class: 'badge-warning', icon: '⏳' },
  processing: { text: 'Собирается', class: 'badge-primary', icon: '📦' },
  shipped: { text: 'В пути', class: 'badge-info', icon: '🚚' },
  delivered: { text: 'Доставлен', class: 'badge-success', icon: '✅' },
  cancelled: { text: 'Отменён', class: 'badge-danger', icon: '❌' }
}

export default function Courier() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('my-orders')
  const [stats, setStats] = useState(null)
  const [myOrders, setMyOrders] = useState([])
  const [availableOrders, setAvailableOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated && user?.role === 'courier') {
      loadData()
    }
  }, [isAuthenticated, user])

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, myOrdersRes, availableRes] = await Promise.all([
        getCourierStats(),
        getCourierOrders(),
        getAvailableOrders()
      ])
      setStats(statsRes.data.stats)
      setMyOrders(myOrdersRes.data.orders)
      setAvailableOrders(availableRes.data.orders)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptOrder = async (orderId) => {
    try {
      await acceptOrder(orderId)
      await loadData()
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка при принятии заказа')
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateCourierOrderStatus(orderId, newStatus)
      setMyOrders(myOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка при обновлении статуса')
    }
  }

  const handleReleaseOrder = async (orderId) => {
    if (!confirm('Отказаться от заказа?')) return
    try {
      await releaseOrder(orderId)
      await loadData()
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка')
    }
  }

  if (!isAuthenticated || user?.role !== 'courier') {
    return (
      <div className="empty-state">
        <h3>Доступ запрещён</h3>
        <p>Эта страница доступна только курьерам</p>
        <Link to="/" className="btn btn-primary mt-2">На главную</Link>
      </div>
    )
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>

  const activeOrders = myOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
  const completedOrders = myOrders.filter(o => o.status === 'delivered')

  return (
    <div className="courier-page">
      <div className="courier-header">
        <h1 className="page-title">🚚 Панель курьера</h1>
        <span className="courier-badge">Курьер: {user.firstName} {user.lastName}</span>
      </div>

      {/* Stats */}
      {stats && (
        <div className="courier-stats">
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <div className="stat-info">
              <span className="stat-value">{stats.activeOrders}</span>
              <span className="stat-label">Активных заказов</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <span className="stat-value">{stats.todayDelivered}</span>
              <span className="stat-label">Доставлено сегодня</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🏆</span>
            <div className="stat-info">
              <span className="stat-value">{stats.totalDelivered}</span>
              <span className="stat-label">Всего доставок</span>
            </div>
          </div>
          <div className="stat-card earnings">
            <span className="stat-icon">💰</span>
            <div className="stat-info">
              <span className="stat-value">{stats.earnings} BYN</span>
              <span className="stat-label">Заработано</span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="courier-tabs">
        <button 
          className={`tab ${activeTab === 'my-orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-orders')}
        >
          📋 Мои заказы ({activeOrders.length})
        </button>
        <button 
          className={`tab ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          🆕 Доступные ({availableOrders.length})
        </button>
        <button 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📜 История ({completedOrders.length})
        </button>
      </div>

      {/* My Orders */}
      {activeTab === 'my-orders' && (
        <div className="orders-list">
          {activeOrders.length === 0 ? (
            <div className="empty-state">
              <h3>Нет активных заказов</h3>
              <p>Возьмите заказ из вкладки "Доступные"</p>
            </div>
          ) : (
            activeOrders.map(order => (
              <div key={order.id} className="delivery-card">
                <div className="delivery-header">
                  <div className="order-info">
                    <span className="order-id">Заказ #{order.id.slice(0, 8)}</span>
                    <span className={`badge ${statusLabels[order.status]?.class}`}>
                      {statusLabels[order.status]?.icon} {statusLabels[order.status]?.text}
                    </span>
                  </div>
                  <span className="order-amount">{order.totalAmount} BYN</span>
                </div>

                <div className="delivery-route">
                  <div className="route-point pickup">
                    <span className="point-icon">📍</span>
                    <div className="point-info">
                      <span className="point-label">Откуда (склад)</span>
                      <span className="point-address">{order.pickupAddress || 'г. Минск, ул. Складская, 15'}</span>
                    </div>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point delivery">
                    <span className="point-icon">🏠</span>
                    <div className="point-info">
                      <span className="point-label">Куда (клиент)</span>
                      <span className="point-address">{order.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="delivery-customer">
                  <h4>👤 Клиент</h4>
                  <p><strong>{order.customerFirstName} {order.customerLastName}</strong></p>
                  <p>📞 {order.customerPhone || order.phone}</p>
                  {order.estimatedDelivery && (
                    <p>⏰ Доставить до: {new Date(order.estimatedDelivery).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</p>
                  )}
                </div>

                <div className="delivery-items">
                  <h4>📦 Что доставить ({order.items?.length} поз.)</h4>
                  <div className="items-list">
                    {order.items?.map(item => (
                      <div key={item.id} className="delivery-item">
                        <img src={item.imageUrl} alt={item.name} />
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-qty">{item.quantity} шт.</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="delivery-actions">
                  {order.status === 'processing' && (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleStatusChange(order.id, 'shipped')}
                    >
                      🚚 Выехал на доставку
                    </button>
                  )}
                  {order.status === 'shipped' && (
                    <button 
                      className="btn btn-success"
                      onClick={() => handleStatusChange(order.id, 'delivered')}
                    >
                      ✅ Доставлено
                    </button>
                  )}
                  {order.status !== 'delivered' && (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleReleaseOrder(order.id)}
                    >
                      ↩️ Отказаться
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Available Orders */}
      {activeTab === 'available' && (
        <div className="orders-list">
          {availableOrders.length === 0 ? (
            <div className="empty-state">
              <h3>Нет доступных заказов</h3>
              <p>Новые заказы появятся здесь</p>
            </div>
          ) : (
            availableOrders.map(order => (
              <div key={order.id} className="delivery-card available">
                <div className="delivery-header">
                  <div className="order-info">
                    <span className="order-id">Заказ #{order.id.slice(0, 8)}</span>
                    <span className="items-count">{order.itemCount} товаров</span>
                  </div>
                  <span className="order-amount">{order.totalAmount} BYN</span>
                </div>

                <div className="delivery-route">
                  <div className="route-point pickup">
                    <span className="point-icon">📍</span>
                    <div className="point-info">
                      <span className="point-label">Откуда</span>
                      <span className="point-address">г. Минск, ул. Складская, 15</span>
                    </div>
                  </div>
                  <div className="route-line"></div>
                  <div className="route-point delivery">
                    <span className="point-icon">🏠</span>
                    <div className="point-info">
                      <span className="point-label">Куда</span>
                      <span className="point-address">{order.shippingAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="delivery-actions">
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    ✋ Взять заказ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="orders-list">
          {completedOrders.length === 0 ? (
            <div className="empty-state">
              <h3>История пуста</h3>
              <p>Здесь будут отображаться выполненные доставки</p>
            </div>
          ) : (
            completedOrders.map(order => (
              <div key={order.id} className="delivery-card completed">
                <div className="delivery-header">
                  <div className="order-info">
                    <span className="order-id">Заказ #{order.id.slice(0, 8)}</span>
                    <span className="badge badge-success">✅ Доставлен</span>
                  </div>
                  <span className="order-amount">{order.totalAmount} BYN</span>
                </div>
                <p className="delivery-address">📍 {order.shippingAddress}</p>
                <p className="delivery-date">
                  {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

