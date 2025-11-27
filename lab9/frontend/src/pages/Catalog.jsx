import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../api'
import ProductCard from '../components/ProductCard'
import './Catalog.css'

export default function Catalog() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest'
  })

  useEffect(() => {
    getCategories().then(res => setCategories(res.data.categories))
  }, [])

  useEffect(() => {
    setLoading(true)
    const params = {
      category,
      ...filters,
      page: searchParams.get('page') || 1
    }
    
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key]
    })

    getProducts(params)
      .then(res => {
        setProducts(res.data.products)
        setPagination(res.data.pagination)
      })
      .finally(() => setLoading(false))
  }, [category, filters, searchParams])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const newParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value)
    })
    setSearchParams(newParams)
  }

  const currentCategory = categories.find(c => c.slug === category)

  return (
    <div className="catalog">
      <h1 className="page-title">
        {currentCategory ? currentCategory.name : 'Каталог товаров'}
      </h1>

      <div className="catalog-layout">
        {/* Filters */}
        <aside className="filters">
          <div className="filter-section">
            <h3>Категории</h3>
            <ul className="category-list">
              <li className={!category ? 'active' : ''}>
                <a href="/catalog">Все товары</a>
              </li>
              {categories.map(cat => (
                <li key={cat.id} className={category === cat.slug ? 'active' : ''}>
                  <a href={`/catalog/${cat.slug}`}>{cat.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Цена</h3>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="От"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />
              <span>—</span>
              <input
                type="number"
                placeholder="До"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary" onClick={applyFilters}>
            Применить
          </button>
        </aside>

        {/* Products */}
        <div className="catalog-content">
          <div className="catalog-header">
            <span className="results-count">
              Найдено: {pagination.total || 0} товаров
            </span>
            <select
              value={filters.sort}
              onChange={(e) => {
                handleFilterChange('sort', e.target.value)
                applyFilters()
              }}
              className="sort-select"
            >
              <option value="newest">Сначала новые</option>
              <option value="price_asc">Сначала дешёвые</option>
              <option value="price_desc">Сначала дорогие</option>
              <option value="rating">По рейтингу</option>
            </select>
          </div>

          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <h3>Товары не найдены</h3>
              <p>Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <>
              <div className="grid grid-3">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {pagination.pages > 1 && (
                <div className="pagination">
                  {Array.from({ length: pagination.pages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`page-btn ${pagination.page === i + 1 ? 'active' : ''}`}
                      onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), page: i + 1 })}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}


