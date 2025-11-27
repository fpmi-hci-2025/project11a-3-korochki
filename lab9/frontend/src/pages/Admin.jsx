import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAdminStats, getAdminUsers, getAdminOrders, updateOrderStatus, updateUserRole, deleteUser } from '../api'
import { useAuth } from '../context/AuthContext'
import api from '../api'
import './Admin.css'

const statusLabels = {
  pending: { text: 'Ожидает', class: 'badge-warning' },
  processing: { text: 'Собирается', class: 'badge-primary' },
  shipped: { text: 'В пути', class: 'badge-info' },
  delivered: { text: 'Доставлен', class: 'badge-success' },
  cancelled: { text: 'Отменён', class: 'badge-danger' }
}

const roleLabels = {
  user: { text: 'Покупатель', class: 'role-user' },
  courier: { text: 'Курьер', class: 'role-courier' },
  admin: { text: 'Админ', class: 'role-admin' }
}

export default function Admin() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [couriers, setCouriers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      loadData()
    }
  }, [isAuthenticated, user])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, usersRes, ordersRes, couriersRes] = await Promise.all([
        getAdminStats(),
        getAdminUsers(),
        getAdminOrders(),
        api.get('/admin/couriers')
      ])
      setStats(statsRes.data)
      setUsers(usersRes.data.users || [])
      setOrders(ordersRes.data.orders || [])
      setCouriers(couriersRes.data.couriers || [])
    } catch (err) {
      console.error('Error loading admin data:', err)
      setError('Ошибка загрузки данных: ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (err) {
      alert('Ошибка при обновлении статуса')
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole)
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      // Reload to update couriers list
      if (newRole === 'courier' || users.find(u => u.id === userId)?.role === 'courier') {
        const couriersRes = await api.get('/admin/couriers')
        setCouriers(couriersRes.data.couriers || [])
      }
    } catch (err) {
      alert('Ошибка при обновлении роли')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Удалить пользователя?')) return
    try {
      await deleteUser(userId)
      setUsers(users.filter(u => u.id !== userId))
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка при удалении')
    }
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="empty-state">
        <h3>Доступ запрещён</h3>
        <p>Эта страница доступна только администраторам</p>
        <Link to="/" className="btn btn-primary mt-2">На главную</Link>
      </div>
    )
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>

  if (error) {
    return (
      <div className="admin-page">
        <div className="error-message">
          <h3>⚠️ Ошибка</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadData}>Повторить</button>
        </div>
      </div>
    )
  }

  const regularUsers = users.filter(u => u.role === 'user')
  const adminUsers = users.filter(u => u.role === 'admin')

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="page-title">🛠️ Админ-панель</h1>
        <span className="admin-badge">👑 {user.firstName} {user.lastName}</span>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Дашборд
        </button>
        <button 
          className={`tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Пользователи ({regularUsers.length})
        </button>
        <button 
          className={`tab ${activeTab === 'couriers' ? 'active' : ''}`}
          onClick={() => setActiveTab('couriers')}
        >
          🚚 Курьеры ({couriers.length})
        </button>
        <button 
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Заказы ({orders.length})
        </button>
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="dashboard">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">👥</span>
              <div className="stat-info">
                <span className="stat-value">{stats?.stats?.users || 0}</span>
                <span className="stat-label">Пользователей</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🚚</span>
              <div className="stat-info">
                <span className="stat-value">{couriers.length}</span>
                <span className="stat-label">Курьеров</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📦</span>
              <div className="stat-info">
                <span className="stat-value">{stats?.stats?.products || 0}</span>
                <span className="stat-label">Товаров</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🛒</span>
              <div className="stat-info">
                <span className="stat-value">{stats?.stats?.orders || 0}</span>
                <span className="stat-label">Заказов</span>
              </div>
            </div>
            <div className="stat-card highlight">
              <span className="stat-icon">💰</span>
              <div className="stat-info">
                <span className="stat-value">{stats?.stats?.revenue || 0} BYN</span>
                <span className="stat-label">Выручка</span>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="card">
              <h3>📊 Заказы по статусам</h3>
              {stats?.ordersByStatus?.length > 0 ? (
                <div className="status-list">
                  {stats.ordersByStatus.map(item => (
                    <div key={item.status} className="status-item">
                      <span className={`badge ${statusLabels[item.status]?.class}`}>
                        {statusLabels[item.status]?.text || item.status}
                      </span>
                      <span className="status-count">{item.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">Заказов пока нет</p>
              )}
            </div>

            <div className="card">
              <h3>🕐 Последние заказы</h3>
              {stats?.recentOrders?.length > 0 ? (
                <div className="recent-orders">
                  {stats.recentOrders.map(order => (
                    <div key={order.id} className="recent-order">
                      <div>
                        <span className="order-customer">{order.firstName} {order.lastName}</span>
                        <span className="order-amount">{order.totalAmount} BYN</span>
                      </div>
                      <span className={`badge ${statusLabels[order.status]?.class}`}>
                        {statusLabels[order.status]?.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">Заказов пока нет</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === 'users' && (
        <div className="users-section">
          {users.length === 0 ? (
            <div className="empty-state">
              <h3>Пользователей пока нет</h3>
              <p>Новые пользователи появятся здесь после регистрации</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Пользователь</th>
                  <th>Email</th>
                  <th>Телефон</th>
                  <th>Заказов</th>
                  <th>Потрачено</th>
                  <th>Роль</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} className={u.role !== 'user' ? 'special-user' : ''}>
                    <td>
                      <div className="user-cell">
                        <div className={`user-avatar ${u.role}`}>
                          {u.role === 'admin' ? '👑' : u.role === 'courier' ? '🚚' : `${u.firstName?.charAt(0) || ''}${u.lastName?.charAt(0) || ''}`}
                        </div>
                        <span>{u.firstName} {u.lastName}</span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone || '—'}</td>
                    <td>{u.orderCount || 0}</td>
                    <td>{u.totalSpent || 0} BYN</td>
                    <td>
                      <select 
                        value={u.role} 
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`role-select ${u.role}`}
                        disabled={u.id === user.id}
                      >
                        <option value="user">👤 Покупатель</option>
                        <option value="courier">🚚 Курьер</option>
                        <option value="admin">👑 Админ</option>
                      </select>
                    </td>
                    <td>
                      {u.id !== user.id && (
                        <button 
                          className="btn-icon danger"
                          onClick={() => handleDeleteUser(u.id)}
                          title="Удалить"
                        >
                          🗑️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Couriers */}
      {activeTab === 'couriers' && (
        <div className="couriers-section">
          {couriers.length === 0 ? (
            <div className="empty-state">
              <h3>🚚 Курьеров пока нет</h3>
              <p>Назначьте роль "Курьер" пользователю во вкладке "Пользователи"</p>
            </div>
          ) : (
            <div className="couriers-grid">
              {couriers.map(courier => (
                <div key={courier.id} className="courier-card">
                  <div className="courier-header">
                    <div className="courier-avatar">🚚</div>
                    <div className="courier-info">
                      <h3>{courier.firstName} {courier.lastName}</h3>
                      <p>{courier.email}</p>
                      <p>📞 {courier.phone || 'Не указан'}</p>
                    </div>
                  </div>

                  <div className="courier-stats">
                    <div className="courier-stat">
                      <span className="value">{courier.activeOrders || 0}</span>
                      <span className="label">Активных</span>
                    </div>
                    <div className="courier-stat">
                      <span className="value">{courier.deliveredOrders || 0}</span>
                      <span className="label">Доставлено</span>
                    </div>
                    <div className="courier-stat highlight">
                      <span className="value">{courier.earnings || 0} BYN</span>
                      <span className="label">Заработано</span>
                    </div>
                  </div>

                  {courier.currentOrders?.length > 0 && (
                    <div className="courier-orders">
                      <h4>📦 Текущие заказы:</h4>
                      {courier.currentOrders.map(order => (
                        <div key={order.id} className="courier-order">
                          <div className="order-info">
                            <span className="order-id">#{order.id.slice(0, 8)}</span>
                            <span className={`badge ${statusLabels[order.status]?.class}`}>
                              {statusLabels[order.status]?.text}
                            </span>
                          </div>
                          <p className="order-customer">👤 {order.customerFirstName} {order.customerLastName}</p>
                          <p className="order-address">📍 {order.shippingAddress?.slice(0, 40)}...</p>
                          <p className="order-amount">💰 {order.totalAmount} BYN</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {(!courier.currentOrders || courier.currentOrders.length === 0) && (
                    <div className="no-orders">
                      <p>✅ Нет активных заказов</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <div className="orders-section">
          {orders.length === 0 ? (
            <div className="empty-state">
              <h3>Заказов пока нет</h3>
              <p>Новые заказы появятся здесь</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID заказа</th>
                  <th>Клиент</th>
                  <th>Товары</th>
                  <th>Сумма</th>
                  <th>Курьер</th>
                  <th>Статус</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="order-id">#{order.id.slice(0, 8)}</td>
                    <td>
                      <div>
                        <strong>{order.firstName} {order.lastName}</strong>
                        <br />
                        <small>{order.email}</small>
                      </div>
                    </td>
                    <td>
                      <div className="order-items-preview">
                        {order.items?.slice(0, 2).map(item => (
                          <span key={item.id}>{item.name} ×{item.quantity}</span>
                        ))}
                        {order.items?.length > 2 && (
                          <span>+{order.items.length - 2} ещё</span>
                        )}
                      </div>
                    </td>
                    <td className="order-total">{order.totalAmount} BYN</td>
                    <td>
                      {order.courierId ? (
                        <span className="courier-assigned">🚚 Назначен</span>
                      ) : (
                        <span className="courier-none">— Нет</span>
                      )}
                    </td>
                    <td>
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`status-select ${order.status}`}
                      >
                        <option value="pending">⏳ Ожидает</option>
                        <option value="processing">📦 Собирается</option>
                        <option value="shipped">🚚 В пути</option>
                        <option value="delivered">✅ Доставлен</option>
                        <option value="cancelled">❌ Отменён</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString('ru-RU')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
