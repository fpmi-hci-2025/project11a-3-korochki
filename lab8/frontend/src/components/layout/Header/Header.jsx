import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

function Header() {
  const { itemsCount } = useCart();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">ТехноМарт</span>
          </Link>

          {/* Search */}
          <div className="search-bar">
            <input 
              type="search" 
              placeholder="Поиск товаров..." 
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>

          {/* Actions */}
          <nav className="header-actions">
            <Link to="/favorites" className="action-link">
              ❤️ Избранное
            </Link>
            <Link to="/cart" className="action-link cart-link">
              🛒 Корзина
              {itemsCount > 0 && (
                <span className="cart-badge">{itemsCount}</span>
              )}
            </Link>
            {isAuthenticated ? (
              <Link to="/profile" className="action-link">
                👤 {user?.firstName || 'Профиль'}
              </Link>
            ) : (
              <Link to="/login" className="action-link">
                👤 Войти
              </Link>
            )}
          </nav>
        </div>

        {/* Navigation */}
        <nav className="main-nav">
          <Link to="/catalog" className="nav-link">Каталог</Link>
          <Link to="/catalog?category=laptops" className="nav-link">Ноутбуки</Link>
          <Link to="/catalog?category=smartphones" className="nav-link">Смартфоны</Link>
          <Link to="/catalog?category=accessories" className="nav-link">Аксессуары</Link>
          <Link to="/catalog?sale=true" className="nav-link sale">🔥 Акции</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;

