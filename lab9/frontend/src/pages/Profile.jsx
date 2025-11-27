import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { updateProfile } from '../api'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || ''
  })
  const [loading, setLoading] = useState(false)

  if (!isAuthenticated) {
    return (
      <div className="empty-state">
        <h3>Войдите в аккаунт</h3>
        <p>Для просмотра профиля необходимо авторизоваться</p>
        <Link to="/login" className="btn btn-primary mt-2">Войти</Link>
      </div>
    )
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile(form)
      setEditing(false)
      alert('Профиль обновлён')
    } catch (err) {
      alert('Ошибка при обновлении')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="profile-page">
      <h1 className="page-title">Личный кабинет</h1>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          
          <h2>{user?.firstName} {user?.lastName}</h2>
          <p className="profile-email">{user?.email}</p>

          {editing ? (
            <div className="profile-form">
              <div className="form-group">
                <label className="form-label">Имя</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.firstName}
                  onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Фамилия</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.lastName}
                  onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Телефон</label>
                <input
                  type="tel"
                  className="form-input"
                  value={form.phone}
                  onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="profile-actions">
                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-info">
              <div className="info-row">
                <span>Телефон:</span>
                <span>{user?.phone || 'Не указан'}</span>
              </div>
              <div className="info-row">
                <span>Роль:</span>
                <span>{user?.role === 'admin' ? 'Администратор' : 'Покупатель'}</span>
              </div>
              <div className="profile-actions">
                <button className="btn btn-primary" onClick={() => setEditing(true)}>
                  Редактировать
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="profile-menu">
          <Link to="/orders" className="menu-item">
            📦 Мои заказы
          </Link>
          <Link to="/cart" className="menu-item">
            🛒 Корзина
          </Link>
          <button className="menu-item danger" onClick={handleLogout}>
            🚪 Выйти
          </button>
        </div>
      </div>
    </div>
  )
}


