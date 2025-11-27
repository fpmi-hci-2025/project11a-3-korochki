import { createContext, useContext, useState, useEffect } from 'react'
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart, clearCart as apiClearCart } from '../api'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 })
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useAuth()

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalAmount: 0 })
      return
    }
    try {
      setLoading(true)
      const res = await getCart()
      setCart(res.data.cart)
    } catch (err) {
      console.error('Failed to fetch cart', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [isAuthenticated])

  const addToCart = async (productId, quantity = 1) => {
    await apiAddToCart(productId, quantity)
    await fetchCart()
  }

  const updateQuantity = async (itemId, quantity) => {
    await updateCartItem(itemId, quantity)
    await fetchCart()
  }

  const removeItem = async (itemId) => {
    await removeFromCart(itemId)
    await fetchCart()
  }

  const clearCart = async () => {
    await apiClearCart()
    setCart({ items: [], totalAmount: 0 })
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeItem, clearCart, itemCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)


