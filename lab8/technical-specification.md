# Техническое задание на разработку клиентской части

**Проект:** ТехноМарт - Веб-приложение  
**Команда:** korochki  
**Группа:** 11а-3

---

## 1. Общие положения

### 1.1. Наименование проекта
Веб-приложение для интернет-магазина электроники "ТехноМарт"

### 1.2. Основание для разработки
- Лабораторная работа №7: Backend API готов
- Лабораторная работа №5: Дизайн и Style Guide
- Лабораторная работа №6: Результаты usability-тестирования

### 1.3. Цель разработки
Создание полнофункционального веб-приложения с современным UI/UX, реализующего:
- Вывод данных (карточки товаров, списки)
- Навигацию между страницами
- Фильтрацию и поиск товаров
- Корзину покупок
- Оформление заказов
- Личный кабинет пользователя

---

## 2. Требования к веб-приложению

### 2.1. Функциональные требования

#### FR-1: Главная страница
- Отображение популярных категорий
- Блок с акционными товарами
- Блок с новинками
- Поиск товаров
- Навигация по сайту

#### FR-2: Каталог товаров
- Список товаров с карточками
- Фильтрация (категория, цена, бренд, рейтинг)
- Сортировка (по цене, рейтингу, новизне)
- Пагинация
- Быстрые действия (в корзину, в избранное)

#### FR-3: Карточка товара
- Детальная информация о товаре
- Изображения товара
- Характеристики
- Отзывы покупателей
- Похожие товары
- Добавление в корзину/избранное

#### FR-4: Корзина
- Список товаров в корзине
- Изменение количества
- Удаление товаров
- Расчёт общей стоимости
- Переход к оформлению

#### FR-5: Оформление заказа
- Форма с адресом доставки
- Выбор способа оплаты
- Подтверждение заказа
- Страница успешного оформления

#### FR-6: Личный кабинет
- Просмотр профиля
- Редактирование данных
- История заказов
- Избранное

#### FR-7: Авторизация
- Регистрация
- Вход в систему
- Восстановление пароля

### 2.2. Технические требования

#### TR-1: Технологический стек
- **Framework**: React 18+
- **Routing**: React Router 6+
- **State Management**: Context API / Redux Toolkit
- **HTTP Client**: Axios
- **Styling**: CSS Modules / Styled Components
- **Build Tool**: Vite
- **UI Components**: Custom (based on Lab 5 Style Guide)

#### TR-2: Архитектура
- Component-based architecture
- Разделение на smart/dumb компоненты
- Custom hooks для бизнес-логики
- Centralized state management
- API service layer

#### TR-3: Производительность
- Lazy loading компонентов
- Image optimization
- Code splitting
- Memoization (React.memo, useMemo, useCallback)
- Виртуализация длинных списков

#### TR-4: Адаптивность
- Responsive design (desktop, tablet, mobile)
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly элементы
- Mobile-first подход

#### TR-5: Доступность (A11y)
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast (WCAG 2.1 AA)

### 2.3. Нефункциональные требования

#### NFR-1: Производительность
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Score > 90

#### NFR-2: Совместимость
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

#### NFR-3: Безопасность
- XSS protection
- CSRF tokens
- Sanitized inputs
- Secure token storage

---

## 3. Структура приложения

### 3.1. Страницы приложения

| № | Страница | Route | Компоненты |
|---|----------|-------|------------|
| 1 | Главная | `/` | Hero, Categories, Featured, NewProducts |
| 2 | Каталог | `/catalog` | ProductList, Filters, Sorting, Pagination |
| 3 | Товар | `/product/:id` | ProductDetails, Gallery, Reviews, Similar |
| 4 | Корзина | `/cart` | CartItems, CartSummary, PromoCode |
| 5 | Оформление | `/checkout` | CheckoutForm, OrderSummary |
| 6 | Успех | `/order-success/:id` | OrderConfirmation |
| 7 | Профиль | `/profile` | UserInfo, OrderHistory |
| 8 | Избранное | `/favorites` | FavoritesList |
| 9 | Вход | `/login` | LoginForm |
| 10 | Регистрация | `/register` | RegisterForm |

### 3.2. Структура проекта

```
frontend/
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── common/              # Общие компоненты
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   └── Loader/
│   │   ├── layout/              # Layout компоненты
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Navigation/
│   │   └── features/            # Feature компоненты
│   │       ├── ProductCard/
│   │       ├── ProductList/
│   │       ├── Filters/
│   │       ├── CartItem/
│   │       └── ReviewCard/
│   ├── pages/                   # Страницы
│   │   ├── Home/
│   │   ├── Catalog/
│   │   ├── ProductDetails/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Profile/
│   │   ├── Login/
│   │   └── Register/
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   ├── useProducts.js
│   │   └── useFavorites.js
│   ├── services/                # API services
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   └── orderService.js
│   ├── context/                 # Context providers
│   │   ├── AuthContext.js
│   │   ├── CartContext.js
│   │   └── ThemeContext.js
│   ├── utils/                   # Утилиты
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── styles/                  # Стили
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── mixins.css
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
├── .eslintrc.js
└── README.md
```

---

## 4. Дизайн системы

### 4.1. Использование Style Guide из Lab 5

#### Цветовая палитра
- Primary: `#2563EB` (синий)
- Secondary: `#10B981` (зелёный)
- Accent: `#F59E0B` (оранжевый)
- Background: `#F9FAFB` (светло-серый)
- Text: `#111827` (тёмно-серый)

#### Типографика
- Font Family: `'Inter', sans-serif`
- Headings: 700 weight
- Body: 400 weight
- Line Height: 1.5

#### Spacing
- Base: 8px
- Scale: 8px, 16px, 24px, 32px, 40px, 48px

#### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px

### 4.2. UI Компоненты

#### Button
```css
.button {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.button-primary {
  background: #2563EB;
  color: white;
}

.button-secondary {
  background: transparent;
  border: 1px solid #D1D5DB;
}
```

#### Card
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

#### Input
```css
.input {
  padding: 12px 16px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 16px;
}
```

---

## 5. Интеграция с Backend

### 5.1. API Endpoints (из Lab 7)

**Base URL:** `http://localhost:3000/api/v1`

#### Products
- `GET /products` - Список товаров
- `GET /products/:id` - Товар по ID
- `GET /products/search?q=...` - Поиск

#### Cart
- `GET /cart` - Получить корзину
- `POST /cart/items` - Добавить в корзину
- `PUT /cart/items/:id` - Обновить количество
- `DELETE /cart/items/:id` - Удалить из корзины

#### Orders
- `POST /orders` - Создать заказ
- `GET /orders` - История заказов

#### Auth
- `POST /auth/register` - Регистрация
- `POST /auth/login` - Вход

### 5.2. API Client (Axios)

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor (add auth token)
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (handle errors)
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 6. State Management

### 6.1. Context API структура

#### AuthContext
```javascript
{
  user: User | null,
  isAuthenticated: boolean,
  login: (credentials) => Promise<void>,
  logout: () => void,
  register: (data) => Promise<void>
}
```

#### CartContext
```javascript
{
  cart: Cart | null,
  items: CartItem[],
  totalAmount: number,
  itemsCount: number,
  addToCart: (productId, quantity) => Promise<void>,
  updateQuantity: (itemId, quantity) => Promise<void>,
  removeFromCart: (itemId) => Promise<void>,
  clearCart: () => Promise<void>
}
```

---

## 7. План разработки

### 7.1. Этап 1: Настройка проекта (1 день)
- [x] Создание Vite проекта
- [ ] Настройка ESLint, Prettier
- [ ] Установка зависимостей
- [ ] Настройка роутинга

### 7.2. Этап 2: Layout и навигация (1 день)
- [ ] Header с навигацией
- [ ] Footer
- [ ] Боковое меню
- [ ] Breadcrumbs

### 7.3. Этап 3: Общие компоненты (1 день)
- [ ] Button, Input, Card
- [ ] Modal, Loader
- [ ] Pagination
- [ ] Badge, Avatar

### 7.4. Этап 4: Страницы каталога (2 дня)
- [ ] Главная страница
- [ ] Страница каталога
- [ ] Фильтры и сортировка
- [ ] Карточки товаров

### 7.5. Этап 5: Страница товара (1 день)
- [ ] Детальная информация
- [ ] Галерея изображений
- [ ] Отзывы
- [ ] Похожие товары

### 7.6. Этап 6: Корзина и заказ (2 дня)
- [ ] Страница корзины
- [ ] Динамическое изменение
- [ ] Форма оформления
- [ ] Страница успеха

### 7.7. Этап 7: Авторизация (1 день)
- [ ] Формы входа/регистрации
- [ ] Context для авторизации
- [ ] Protected routes

### 7.8. Этап 8: Личный кабинет (1 день)
- [ ] Страница профиля
- [ ] История заказов
- [ ] Избранное

### 7.9. Этап 9: CI/CD и деплой (1 день)
- [ ] GitHub Actions
- [ ] ESLint проверка
- [ ] Build и деплой на Vercel

---

## 8. Критерии приемки

### 8.1. Функциональность
- [x] Все страницы отображаются корректно
- [ ] Навигация работает без ошибок
- [ ] Формы валидируются правильно
- [ ] Данные отображаются из mock данных
- [ ] Корзина работает (добавление, удаление, изменение)

### 8.2. Дизайн
- [ ] Соответствует Style Guide из Lab 5
- [ ] Responsive на всех экранах
- [ ] Анимации плавные (transition)
- [ ] Consistent UI во всём приложении

### 8.3. Код
- [ ] ESLint проходит без ошибок
- [ ] Код хорошо структурирован
- [ ] Компоненты переиспользуются
- [ ] Нет дублирования кода

### 8.4. Производительность
- [ ] Lighthouse Score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shifts

### 8.5. DevOps
- [ ] GitHub Actions настроен
- [ ] Деплой на Vercel работает
- [ ] Code quality проверка интегрирована

---

## 9. Риски и ограничения

### 9.1. Риски
- **Р1**: Сложность интеграции с backend
  - *Митигация*: Использование mock данных на первом этапе
- **Р2**: Performance issues с большим количеством товаров
  - *Митигация*: Виртуализация списков, lazy loading

### 9.2. Ограничения
- Подключение к реальному API опционально (mock данные достаточно)
- Мобильное приложение не разрабатывается
- Один разработчик в команде

---

**Дата создания:** 30 октября 2025  
**Команда:** korochki  
**Группа:** 11а-3

