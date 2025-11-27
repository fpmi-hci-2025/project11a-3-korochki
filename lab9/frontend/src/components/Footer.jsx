import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">T</span>
            <span>ТехноМарт</span>
          </div>
          <p className="footer-desc">Интернет-магазин электроники с лучшими ценами и быстрой доставкой</p>
        </div>

        <div className="footer-section">
          <h4>Каталог</h4>
          <Link to="/catalog/smartphones">Смартфоны</Link>
          <Link to="/catalog/laptops">Ноутбуки</Link>
          <Link to="/catalog/tablets">Планшеты</Link>
          <Link to="/catalog/headphones">Наушники</Link>
        </div>

        <div className="footer-section">
          <h4>Покупателям</h4>
          <Link to="/cart">Корзина</Link>
          <Link to="/orders">Мои заказы</Link>
          <Link to="/profile">Профиль</Link>
        </div>

        <div className="footer-section">
          <h4>Контакты</h4>
          <p>📞 +375 (29) 123-45-67</p>
          <p>📧 info@technomart.by</p>
          <p>📍 г. Минск, ул. Примерная, 1</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 ТехноМарт. Все права защищены.</p>
        <p>Проект по курсу "ПЧМИ" | БГУ ФПМИ | Команда korochki</p>
      </div>
    </footer>
  )
}


