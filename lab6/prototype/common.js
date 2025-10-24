// Common JavaScript functions for all pages

// Global state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let comparison = JSON.parse(localStorage.getItem('comparison')) || [];

// Cart functions
function addToCart(productId) {
    if (event) event.stopPropagation();
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateBadges();
        showNotification('Товар добавлен в корзину');
    } else {
        showNotification('Товар уже в корзине');
    }
}

function removeFromCart(productId) {
    const index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateBadges();
        return true;
    }
    return false;
}

function toggleFavorite(productId, event) {
    if (event) event.stopPropagation();
    const index = favorites.indexOf(productId);
    if (index === -1) {
        favorites.push(productId);
        showNotification('Добавлено в избранное');
    } else {
        favorites.splice(index, 1);
        showNotification('Удалено из избранного');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateBadges();
}

function toggleCompare(productId, event) {
    if (event) event.stopPropagation();
    const index = comparison.indexOf(productId);
    if (index === -1) {
        if (comparison.length >= 4) {
            showNotification('Можно сравнить максимум 4 товара');
            return;
        }
        comparison.push(productId);
        showNotification('Добавлено к сравнению');
    } else {
        comparison.splice(index, 1);
        showNotification('Удалено из сравнения');
    }
    localStorage.setItem('comparison', JSON.stringify(comparison));
    updateBadges();
}

function updateBadges() {
    const cartBadge = document.getElementById('cartCount');
    const favBadge = document.getElementById('favoriteCount');
    const compBadge = document.getElementById('compareCount');
    
    if (cartBadge) cartBadge.textContent = cart.length;
    if (favBadge) favBadge.textContent = favorites.length;
    if (compBadge) compBadge.textContent = comparison.length;
}

function showNotification(message) {
    const notif = document.getElementById('notification');
    if (notif) {
        notif.textContent = message;
        notif.classList.add('show');
        setTimeout(() => {
            notif.classList.remove('show');
        }, 2000);
    }
}

// Navigation functions
function goToProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function goToCart() {
    window.location.href = 'cart.html';
}

function goToFavorites() {
    window.location.href = 'favorites.html';
}

function goToComparison() {
    window.location.href = 'comparison.html';
}

function goToProfile() {
    window.location.href = 'profile.html';
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

// Product card creation
function createProductCard(product) {
    const div = document.createElement('div');
    div.className = 'product-card';
    
    const isFavorite = favorites.includes(product.id);
    const isInComparison = comparison.includes(product.id);
    
    div.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">${'⭐'.repeat(product.rating)}</div>
        <div class="product-price">${product.price} Br</div>
        ${product.oldPrice ? `<div class="product-old-price">${product.oldPrice} Br</div>` : ''}
        ${!product.inStock ? '<div style="color: #EF4444; font-weight: 600;">Нет в наличии</div>' : ''}
        <button class="btn-primary" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
            ${product.inStock ? 'В корзину' : 'Недоступно'}
        </button>
        <div class="product-actions">
            <button class="icon-action ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id}, event)" title="В избранное">❤️</button>
            <button class="icon-action ${isInComparison ? 'active' : ''}" onclick="toggleCompare(${product.id}, event)" title="Сравнить">⚖️</button>
            <button class="btn-secondary" onclick="goToProduct(${product.id})" style="flex: 1;">Подробнее</button>
        </div>
    `;
    
    div.onclick = (e) => {
        if (!e.target.closest('button')) {
            goToProduct(product.id);
        }
    };
    
    return div;
}

// Get product by ID
function getProductById(id) {
    return allProducts.find(p => p.id === parseInt(id));
}

// Get products by IDs
function getProductsByIds(ids) {
    return ids.map(id => getProductById(id)).filter(p => p !== undefined);
}

// Initialize badges on page load
document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
});

