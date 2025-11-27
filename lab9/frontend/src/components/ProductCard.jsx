import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert('Войдите для добавления в корзину')
      return
    }
    try {
      await addToCart(product.id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} loading="lazy" />
        {product.oldPrice && (
          <span className="product-discount">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
      </div>
      
      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="rating-value">{product.rating}</span>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        <div className="product-price">
          <span className="price">{product.price} BYN</span>
          {product.oldPrice && (
            <span className="price-old">{product.oldPrice} BYN</span>
          )}
        </div>

        <button className="btn btn-primary add-to-cart" onClick={handleAddToCart}>
          В корзину
        </button>
      </div>
    </Link>
  )
}


