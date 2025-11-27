import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const login = (data) => api.post('/auth/login', data)
export const register = (data) => api.post('/auth/register', data)
export const getProfile = () => api.get('/auth/me')
export const updateProfile = (data) => api.put('/auth/profile', data)

// Products
export const getProducts = (params) => api.get('/products', { params })
export const getProduct = (id) => api.get(`/products/${id}`)

// Categories
export const getCategories = () => api.get('/categories')

// Cart
export const getCart = () => api.get('/cart')
export const addToCart = (productId, quantity = 1) => api.post('/cart/items', { productId, quantity })
export const updateCartItem = (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity })
export const removeFromCart = (itemId) => api.delete(`/cart/items/${itemId}`)
export const clearCart = () => api.delete('/cart')

// Orders
export const getOrders = () => api.get('/orders')
export const getOrder = (id) => api.get(`/orders/${id}`)
export const createOrder = (data) => api.post('/orders', data)
export const cancelOrder = (id) => api.put(`/orders/${id}/cancel`)

// Reviews
export const getReviews = (productId) => api.get(`/reviews/product/${productId}`)
export const addReview = (data) => api.post('/reviews', data)

// Admin
export const getAdminStats = () => api.get('/admin/stats')
export const getAdminUsers = () => api.get('/admin/users')
export const getAdminUser = (id) => api.get(`/admin/users/${id}`)
export const updateUserRole = (id, role) => api.put(`/admin/users/${id}/role`, { role })
export const deleteUser = (id) => api.delete(`/admin/users/${id}`)
export const getAdminOrders = (status) => api.get('/admin/orders', { params: { status } })
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}/status`, { status })

// Courier
export const getCourierStats = () => api.get('/courier/stats')
export const getCourierOrders = (status) => api.get('/courier/orders', { params: { status } })
export const getAvailableOrders = () => api.get('/courier/available')
export const acceptOrder = (id) => api.post(`/courier/orders/${id}/accept`)
export const updateCourierOrderStatus = (id, status) => api.put(`/courier/orders/${id}/status`, { status })
export const releaseOrder = (id) => api.post(`/courier/orders/${id}/release`)

export default api

