import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, getCategories } from '../api'
import ProductCard from '../components/ProductCard'
import './Home.css'

export default function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getProducts({ limit: 8 }),
      getCategories()
    ]).then(([productsRes, categoriesRes]) => {
      setProducts(productsRes.data.products)
      setCategories(categoriesRes.data.categories)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Добро пожаловать в ТехноМарт</h1>
          <p>Лучшая электроника по выгодным ценам с быстрой доставкой по всей Беларуси</p>
          <Link to="/catalog" className="btn btn-primary btn-lg">Перейти в каталог</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <h2 className="section-title">Категории</h2>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/catalog/${cat.slug}`} key={cat.id} className="category-card">
              <div className="category-icon">
                {cat.slug === 'smartphones' && '📱'}
                {cat.slug === 'laptops' && '💻'}
                {cat.slug === 'tablets' && '📲'}
                {cat.slug === 'headphones' && '🎧'}
                {cat.slug === 'tvs' && '📺'}
                {cat.slug === 'accessories' && '⌚'}
              </div>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Популярные товары</h2>
          <Link to="/catalog" className="view-all">Смотреть все →</Link>
        </div>
        <div className="grid grid-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h3>Быстрая доставка</h3>
          <p>Доставим за 1-2 дня по всей Беларуси</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💳</span>
          <h3>Удобная оплата</h3>
          <p>Картой, наличными или в рассрочку</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🔒</span>
          <h3>Гарантия качества</h3>
          <p>Официальная гарантия на все товары</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💬</span>
          <h3>Поддержка 24/7</h3>
          <p>Ответим на любые вопросы</p>
        </div>
      </section>
    </div>
  )
}


