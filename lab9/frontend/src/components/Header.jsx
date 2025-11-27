import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Header.css'

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">T</span>
          <span className="logo-text">ТехноМарт</span>
        </Link>

        <nav className="nav">
          <Link to="/catalog" className="nav-link">Каталог</Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-btn">
            🛒
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">
                {user?.role === 'admin' && '👑 '}
                {user?.role === 'courier' && '🚚 '}
                {user?.firstName}
              </span>
              <div className="user-dropdown">
                {user?.role === 'admin' && (
                  <Link to="/admin" className="admin-link">🛠️ Админ-панель</Link>
                )}
                {user?.role === 'courier' && (
                  <Link to="/courier" className="courier-link">🚚 Панель курьера</Link>
                )}
                <Link to="/profile">Профиль</Link>
                <Link to="/orders">Заказы</Link>
                <button onClick={handleLogout}>Выйти</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Войти</Link>
          )}
        </div>
      </div>
    </header>
  )
}

