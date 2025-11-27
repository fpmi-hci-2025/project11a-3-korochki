import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, addReview } from '../api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Product.css'

export default function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' })
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    getProduct(id)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false))
  }, [id])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Войдите для добавления в корзину')
      return
    }
    await addToCart(product.id, quantity)
    alert('Товар добавлен в корзину!')
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert('Войдите для добавления отзыва')
      return
    }
    try {
      await addReview({ productId: product.id, ...reviewForm })
      const res = await getProduct(id)
      setProduct(res.data)
      setReviewForm({ rating: 5, title: '', comment: '' })
      alert('Отзыв добавлен!')
    } catch (err) {
      alert(err.response?.data?.error || 'Ошибка')
    }
  }

  if (loading) return <div className="loading"><div className="spinner"></div></div>
  if (!product) return <div className="empty-state"><h3>Товар не найден</h3></div>

  return (
    <div className="product-page">
      <nav className="breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/catalog">Каталог</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-main">
        <div className="product-gallery">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-details">
          <span className="product-brand">{product.brand}</span>
          <h1>{product.name}</h1>
          
          <div className="product-rating">
            <span className="stars">{'★'.repeat(Math.round(product.rating))}</span>
            <span>{product.rating}</span>
            <span className="reviews-count">({product.reviewsCount} отзывов)</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-price-block">
            <span className="price">{product.price} BYN</span>
            {product.oldPrice && (
              <span className="price-old">{product.oldPrice} BYN</span>
            )}
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              В корзину
            </button>
          </div>

          {product.specs && (
            <div className="product-specs">
              <h3>Характеристики</h3>
              <table>
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <section className="reviews-section">
        <h2>Отзывы ({product.reviews?.length || 0})</h2>

        {isAuthenticated && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Оставить отзыв</h3>
            <div className="form-group">
              <label>Оценка</label>
              <div className="rating-select">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    className={reviewForm.rating >= n ? 'active' : ''}
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: n }))}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Заголовок</label>
              <input
                type="text"
                className="form-input"
                value={reviewForm.title}
                onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Комментарий</label>
              <textarea
                className="form-input"
                rows="4"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn btn-primary">Отправить</button>
          </form>
        )}

        <div className="reviews-list">
          {product.reviews?.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <span className="review-author">{review.firstName} {review.lastName}</span>
                <span className="review-rating">{'★'.repeat(review.rating)}</span>
              </div>
              {review.title && <h4>{review.title}</h4>}
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


