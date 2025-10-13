# Проектирование маршрутов и конечных точек API - ТехноМарт

## Структура API

API построен по принципам REST и следует best practices:
- Версионирование API: `/api/v1/`
- JSON формат для запросов и ответов
- HTTP статус коды для индикации результата
- JWT токены для аутентификации
- Rate limiting для защиты от злоупотреблений

---

## 1. Модуль: Аутентификация и пользователи

### 1.1 Регистрация и вход

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| POST | `/api/v1/auth/register` | Регистрация нового пользователя | UC11 |
| POST | `/api/v1/auth/login` | Вход в систему | UC12 |
| POST | `/api/v1/auth/logout` | Выход из системы | UC12 |
| POST | `/api/v1/auth/refresh` | Обновление токена | UC12 |
| POST | `/api/v1/auth/forgot-password` | Запрос сброса пароля | UC13 |
| POST | `/api/v1/auth/reset-password` | Сброс пароля | UC13 |
| GET | `/api/v1/auth/verify-email/:token` | Подтверждение email | UC11 |

**Детали:**

#### POST `/api/v1/auth/register`
- **Use Case:** UC11 (Регистрация)
- **Доступ:** Публичный
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "Иван",
  "lastName": "Петров",
  "phone": "+79161234567"
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "Регистрация успешна. Проверьте email для подтверждения.",
  "data": {
    "userId": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST `/api/v1/auth/login`
- **Use Case:** UC12 (Авторизация)
- **Доступ:** Публичный
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```
- **Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Иван",
      "lastName": "Петров",
      "role": "customer"
    }
  }
}
```

---

### 1.2 Управление профилем

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/users/me` | Получить профиль текущего пользователя | UC13 |
| PUT | `/api/v1/users/me` | Обновить профиль | UC13 |
| DELETE | `/api/v1/users/me` | Удалить аккаунт | UC13 |
| PUT | `/api/v1/users/me/password` | Изменить пароль | UC13 |
| GET | `/api/v1/users/me/addresses` | Получить адреса доставки | UC13 |
| POST | `/api/v1/users/me/addresses` | Добавить адрес доставки | UC13 |
| PUT | `/api/v1/users/me/addresses/:id` | Обновить адрес | UC13 |
| DELETE | `/api/v1/users/me/addresses/:id` | Удалить адрес | UC13 |

**Детали:**

#### GET `/api/v1/users/me`
- **Use Case:** UC13 (Управление профилем)
- **Доступ:** Авторизованные пользователи
- **Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Иван",
    "lastName": "Петров",
    "phone": "+79161234567",
    "dateOfBirth": "1990-01-15",
    "gender": "male",
    "role": "customer",
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

---

## 2. Модуль: Каталог товаров

### 2.1 Товары

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/products` | Получить список товаров | UC1, UC2, UC3 |
| GET | `/api/v1/products/:id` | Получить товар по ID | UC4 |
| GET | `/api/v1/products/search` | Поиск товаров | UC2 |
| GET | `/api/v1/products/:id/reviews` | Получить отзывы товара | UC15 |
| GET | `/api/v1/products/:id/similar` | Получить похожие товары | UC4 |
| POST | `/api/v1/products` | Создать товар (Admin) | UC18 |
| PUT | `/api/v1/products/:id` | Обновить товар (Admin) | UC18 |
| DELETE | `/api/v1/products/:id` | Удалить товар (Admin) | UC18 |

**Детали:**

#### GET `/api/v1/products`
- **Use Cases:** UC1 (Просмотр каталога), UC3 (Фильтрация)
- **Доступ:** Публичный
- **Query Parameters:**
  - `page` (number): Номер страницы (default: 1)
  - `limit` (number): Товаров на странице (default: 20)
  - `category` (uuid): Фильтр по категории
  - `brand` (uuid): Фильтр по бренду
  - `minPrice` (number): Минимальная цена
  - `maxPrice` (number): Максимальная цена
  - `inStock` (boolean): Только в наличии
  - `sort` (string): Сортировка (price_asc, price_desc, rating, newest)
- **Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "name": "iPhone 15 Pro Max 256GB",
        "shortDescription": "Флагманский смартфон Apple",
        "price": 119999.00,
        "discountPrice": 109999.00,
        "sku": "IPHONE-15-PRO-256",
        "inStock": 15,
        "isActive": true,
        "category": {
          "id": "uuid",
          "name": "Смартфоны",
          "slug": "smartphones"
        },
        "brand": {
          "id": "uuid",
          "name": "Apple",
          "logo": "https://cdn.technomart.com/brands/apple.png"
        },
        "mainImage": "https://cdn.technomart.com/products/iphone15pro.jpg",
        "rating": {
          "average": 4.8,
          "totalReviews": 156
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 250,
      "totalPages": 13
    },
    "filters": {
      "categories": [...],
      "brands": [...],
      "priceRange": {"min": 1000, "max": 500000}
    }
  }
}
```

#### GET `/api/v1/products/search`
- **Use Case:** UC2 (Поиск товаров)
- **Доступ:** Публичный
- **Query Parameters:**
  - `q` (string): Поисковый запрос
  - `page`, `limit`, `sort`: Как в GET /products
- **Response:** Аналогично GET /products

#### GET `/api/v1/products/:id`
- **Use Case:** UC4 (Просмотр карточки товара)
- **Доступ:** Публичный
- **Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "iPhone 15 Pro Max 256GB",
    "description": "Полное описание товара...",
    "shortDescription": "Краткое описание",
    "price": 119999.00,
    "discountPrice": 109999.00,
    "sku": "IPHONE-15-PRO-256",
    "weight": 0.221,
    "dimensions": "159.9 x 76.7 x 8.25 мм",
    "inStock": 15,
    "reservedStock": 3,
    "isActive": true,
    "category": {
      "id": "uuid",
      "name": "Смартфоны",
      "slug": "smartphones"
    },
    "brand": {
      "id": "uuid",
      "name": "Apple",
      "logo": "https://cdn.technomart.com/brands/apple.png",
      "website": "https://www.apple.com"
    },
    "images": [
      {
        "id": "uuid",
        "url": "https://cdn.technomart.com/products/iphone15pro-1.jpg",
        "altText": "iPhone 15 Pro Max спереди",
        "isMain": true
      }
    ],
    "characteristics": [
      {
        "name": "Процессор",
        "value": "Apple A17 Pro",
        "unit": null
      },
      {
        "name": "Оперативная память",
        "value": "8",
        "unit": "ГБ"
      }
    ],
    "rating": {
      "average": 4.8,
      "totalReviews": 156,
      "distribution": {
        "5": 120,
        "4": 25,
        "3": 8,
        "2": 2,
        "1": 1
      }
    },
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
}
```

---

### 2.2 Категории

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/categories` | Получить список категорий | UC1 |
| GET | `/api/v1/categories/:id` | Получить категорию по ID | UC1 |
| GET | `/api/v1/categories/:id/products` | Товары категории | UC1 |
| POST | `/api/v1/categories` | Создать категорию (Admin) | UC18 |
| PUT | `/api/v1/categories/:id` | Обновить категорию (Admin) | UC18 |
| DELETE | `/api/v1/categories/:id` | Удалить категорию (Admin) | UC18 |

---

### 2.3 Бренды

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/brands` | Получить список брендов | UC3 |
| GET | `/api/v1/brands/:id` | Получить бренд по ID | UC3 |
| GET | `/api/v1/brands/:id/products` | Товары бренда | UC3 |
| POST | `/api/v1/brands` | Создать бренд (Admin) | UC18 |
| PUT | `/api/v1/brands/:id` | Обновить бренд (Admin) | UC18 |
| DELETE | `/api/v1/brands/:id` | Удалить бренд (Admin) | UC18 |

---

## 3. Модуль: Корзина

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/cart` | Получить корзину | UC6 |
| POST | `/api/v1/cart/items` | Добавить товар в корзину | UC6 |
| PUT | `/api/v1/cart/items/:id` | Обновить количество товара | UC6 |
| DELETE | `/api/v1/cart/items/:id` | Удалить товар из корзины | UC6 |
| DELETE | `/api/v1/cart` | Очистить корзину | UC6 |

**Детали:**

#### GET `/api/v1/cart`
- **Use Case:** UC6 (Добавление в корзину)
- **Доступ:** Авторизованные пользователи
- **Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "iPhone 15 Pro Max 256GB",
          "price": 119999.00,
          "discountPrice": 109999.00,
          "sku": "IPHONE-15-PRO-256",
          "image": "https://cdn.technomart.com/products/iphone15pro.jpg",
          "inStock": 15
        },
        "quantity": 1,
        "subtotal": 109999.00,
        "addedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "summary": {
      "itemsCount": 3,
      "subtotal": 250000.00,
      "discount": 15000.00,
      "total": 235000.00
    }
  }
}
```

#### POST `/api/v1/cart/items`
- **Use Case:** UC6 (Добавление в корзину)
- **Доступ:** Авторизованные пользователи
- **Request Body:**
```json
{
  "productId": "uuid",
  "quantity": 1
}
```
- **Response:** `201 Created`

---

## 4. Модуль: Заказы

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/orders` | Получить список заказов | UC14 |
| GET | `/api/v1/orders/:id` | Получить заказ по ID | UC8 |
| POST | `/api/v1/orders` | Создать заказ | UC7 |
| PUT | `/api/v1/orders/:id/cancel` | Отменить заказ | UC9 |
| GET | `/api/v1/orders/:id/tracking` | Отследить доставку | UC8, UC23 |
| POST | `/api/v1/orders/:id/confirm-delivery` | Подтвердить получение | UC24 |

**Детали:**

#### POST `/api/v1/orders`
- **Use Case:** UC7 (Оформление заказа)
- **Доступ:** Авторизованные пользователи
- **Request Body:**
```json
{
  "deliveryAddress": {
    "country": "Россия",
    "city": "Москва",
    "street": "Тверская",
    "building": "1",
    "apartment": "10",
    "postalCode": "125009"
  },
  "deliveryMethod": "courier",
  "paymentMethod": "card",
  "notes": "Позвоните за 30 минут"
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "Заказ успешно создан",
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-2024-000123",
    "status": "created",
    "totalAmount": 235000.00,
    "paymentUrl": "https://payment.gateway.com/pay/xxxxx",
    "createdAt": "2024-01-15T14:30:00Z"
  }
}
```

#### GET `/api/v1/orders/:id`
- **Use Case:** UC8 (Отслеживание заказа)
- **Доступ:** Владелец заказа, Admin, Manager
- **Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "ORD-2024-000123",
    "status": "shipped",
    "totalAmount": 235000.00,
    "discountAmount": 15000.00,
    "deliveryAmount": 500.00,
    "paymentMethod": "card",
    "deliveryMethod": "courier",
    "deliveryAddress": {...},
    "items": [
      {
        "id": "uuid",
        "product": {
          "id": "uuid",
          "name": "iPhone 15 Pro Max 256GB",
          "sku": "IPHONE-15-PRO-256",
          "image": "https://cdn.technomart.com/products/iphone15pro.jpg"
        },
        "quantity": 1,
        "unitPrice": 109999.00,
        "totalPrice": 109999.00
      }
    ],
    "payment": {
      "id": "uuid",
      "status": "completed",
      "method": "card",
      "transactionId": "TRX-123456",
      "processedAt": "2024-01-15T14:35:00Z"
    },
    "delivery": {
      "id": "uuid",
      "status": "in_transit",
      "method": "courier",
      "trackingNumber": "TRACK-123456789",
      "carrierName": "СДЭК",
      "estimatedDate": "2024-01-20T18:00:00Z"
    },
    "statusHistory": [
      {
        "status": "created",
        "timestamp": "2024-01-15T14:30:00Z"
      },
      {
        "status": "confirmed",
        "timestamp": "2024-01-15T15:00:00Z"
      },
      {
        "status": "shipped",
        "timestamp": "2024-01-16T10:00:00Z"
      }
    ],
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-16T10:00:00Z"
  }
}
```

#### PUT `/api/v1/orders/:id/cancel`
- **Use Case:** UC9 (Отмена заказа)
- **Доступ:** Владелец заказа (если статус позволяет)
- **Request Body:**
```json
{
  "reason": "Передумал покупать"
}
```
- **Response:** `200 OK`

---

## 5. Модуль: Отзывы

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/reviews` | Получить список отзывов | UC15 |
| GET | `/api/v1/reviews/:id` | Получить отзыв по ID | UC15 |
| POST | `/api/v1/reviews` | Создать отзыв | UC16 |
| PUT | `/api/v1/reviews/:id` | Обновить отзыв | UC16 |
| DELETE | `/api/v1/reviews/:id` | Удалить отзыв | UC16 |
| POST | `/api/v1/reviews/:id/helpful` | Оценить полезность | UC15 |
| PUT | `/api/v1/reviews/:id/moderate` | Модерировать (Admin) | UC17 |

**Детали:**

#### POST `/api/v1/reviews`
- **Use Case:** UC16 (Написание отзыва)
- **Доступ:** Покупатели (купившие товар)
- **Request Body:**
```json
{
  "productId": "uuid",
  "rating": 5,
  "title": "Отличный смартфон!",
  "content": "Очень доволен покупкой. Быстрый, качественный...",
  "pros": "Камера, производительность, дизайн",
  "cons": "Цена",
  "isRecommended": true,
  "images": [
    "https://cdn.technomart.com/reviews/img1.jpg"
  ]
}
```
- **Response:** `201 Created`

#### PUT `/api/v1/reviews/:id/moderate`
- **Use Case:** UC17 (Модерация отзывов)
- **Доступ:** Admin, Manager
- **Request Body:**
```json
{
  "action": "approve",
  "reason": "Отзыв соответствует правилам"
}
```
- **Response:** `200 OK`

---

## 6. Модуль: Сравнение товаров

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/compare` | Получить список сравнения | UC5 |
| POST | `/api/v1/compare/items` | Добавить товар к сравнению | UC5 |
| DELETE | `/api/v1/compare/items/:id` | Удалить товар из сравнения | UC5 |
| DELETE | `/api/v1/compare` | Очистить список сравнения | UC5 |

---

## 7. Модуль: Администрирование

### 7.1 Управление пользователями

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/admin/users` | Список всех пользователей | UC19 |
| GET | `/api/v1/admin/users/:id` | Детали пользователя | UC19 |
| PUT | `/api/v1/admin/users/:id` | Обновить пользователя | UC19 |
| PUT | `/api/v1/admin/users/:id/block` | Заблокировать пользователя | UC19 |
| PUT | `/api/v1/admin/users/:id/unblock` | Разблокировать пользователя | UC19 |
| PUT | `/api/v1/admin/users/:id/role` | Изменить роль | UC19 |

**Доступ:** Admin

---

### 7.2 Управление заказами

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/admin/orders` | Список всех заказов | UC10 |
| PUT | `/api/v1/admin/orders/:id/status` | Изменить статус заказа | UC10 |
| PUT | `/api/v1/admin/orders/:id/assign-courier` | Назначить курьера | UC10 |
| GET | `/api/v1/admin/orders/:id/invoice` | Сгенерировать накладную | UC10 |

**Доступ:** Admin, Manager

---

### 7.3 Аналитика

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/admin/analytics/sales` | Статистика продаж | UC21 |
| GET | `/api/v1/admin/analytics/products` | Популярные товары | UC21 |
| GET | `/api/v1/admin/analytics/customers` | Статистика клиентов | UC21 |
| GET | `/api/v1/admin/analytics/revenue` | Выручка | UC21 |
| GET | `/api/v1/admin/analytics/regions` | Статистика по регионам | UC21 |

**Доступ:** Admin, Manager

---

### 7.4 Настройки системы

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/admin/settings` | Получить настройки | UC20 |
| PUT | `/api/v1/admin/settings` | Обновить настройки | UC20 |
| GET | `/api/v1/admin/settings/delivery` | Настройки доставки | UC20 |
| PUT | `/api/v1/admin/settings/delivery` | Обновить настройки доставки | UC20 |
| GET | `/api/v1/admin/settings/payment` | Настройки оплаты | UC20 |
| PUT | `/api/v1/admin/settings/payment` | Обновить настройки оплаты | UC20 |

**Доступ:** Admin

---

## 8. Модуль: Доставка (для курьеров)

| HTTP Метод | Маршрут | Описание | Use Case |
|------------|---------|----------|----------|
| GET | `/api/v1/courier/deliveries` | Мои доставки | UC23 |
| GET | `/api/v1/courier/deliveries/:id` | Детали доставки | UC23 |
| PUT | `/api/v1/courier/deliveries/:id/status` | Обновить статус | UC23 |
| POST | `/api/v1/courier/deliveries/:id/confirm` | Подтвердить доставку | UC24 |

**Доступ:** Courier

---

## Сопоставление Use Cases с конечными точками

| Use Case ID | Название | HTTP Метод | Конечная точка |
|-------------|----------|------------|----------------|
| UC1 | Просмотр каталога | GET | `/api/v1/products` |
| UC1 | Просмотр каталога | GET | `/api/v1/categories` |
| UC2 | Поиск товаров | GET | `/api/v1/products/search` |
| UC3 | Фильтрация товаров | GET | `/api/v1/products?filters` |
| UC4 | Просмотр карточки товара | GET | `/api/v1/products/:id` |
| UC5 | Сравнение товаров | GET, POST, DELETE | `/api/v1/compare` |
| UC6 | Добавление в корзину | GET, POST, PUT, DELETE | `/api/v1/cart` |
| UC7 | Оформление заказа | POST | `/api/v1/orders` |
| UC8 | Отслеживание заказа | GET | `/api/v1/orders/:id` |
| UC9 | Отмена заказа | PUT | `/api/v1/orders/:id/cancel` |
| UC10 | Обработка заказа | GET, PUT | `/api/v1/admin/orders` |
| UC11 | Регистрация | POST | `/api/v1/auth/register` |
| UC12 | Авторизация | POST | `/api/v1/auth/login` |
| UC13 | Управление профилем | GET, PUT, DELETE | `/api/v1/users/me` |
| UC14 | Просмотр истории заказов | GET | `/api/v1/orders` |
| UC15 | Чтение отзывов | GET | `/api/v1/reviews` |
| UC16 | Написание отзыва | POST | `/api/v1/reviews` |
| UC17 | Модерация отзывов | PUT | `/api/v1/reviews/:id/moderate` |
| UC18 | Управление каталогом | POST, PUT, DELETE | `/api/v1/products` |
| UC19 | Управление пользователями | GET, PUT | `/api/v1/admin/users` |
| UC20 | Настройка системы | GET, PUT | `/api/v1/admin/settings` |
| UC21 | Просмотр аналитики | GET | `/api/v1/admin/analytics/*` |
| UC22 | Выбор способа доставки | POST | `/api/v1/orders` (часть создания) |
| UC23 | Отслеживание доставки | GET | `/api/v1/orders/:id/tracking` |
| UC24 | Подтверждение получения | POST | `/api/v1/orders/:id/confirm-delivery` |

---

## HTTP статус коды

| Код | Описание | Использование |
|-----|----------|---------------|
| 200 | OK | Успешный GET, PUT, DELETE запрос |
| 201 | Created | Успешный POST запрос (создание ресурса) |
| 204 | No Content | Успешный DELETE без возврата данных |
| 400 | Bad Request | Невалидные данные в запросе |
| 401 | Unauthorized | Не авторизован |
| 403 | Forbidden | Нет прав доступа |
| 404 | Not Found | Ресурс не найден |
| 409 | Conflict | Конфликт данных (например, email уже существует) |
| 422 | Unprocessable Entity | Ошибка валидации |
| 429 | Too Many Requests | Превышен лимит запросов |
| 500 | Internal Server Error | Внутренняя ошибка сервера |

---

## Аутентификация и авторизация

### JWT Токены

Используется Bearer токен в заголовке:
```
Authorization: Bearer <access_token>
```

### Роли и права доступа

| Роль | Права |
|------|-------|
| **Guest** | Просмотр товаров, категорий, отзывов |
| **Customer** | Guest + Корзина, заказы, отзывы, профиль |
| **Manager** | Customer + Обработка заказов, модерация отзывов |
| **Admin** | Manager + Управление каталогом, пользователями, настройками |
| **Courier** | Управление доставками |

---

## Rate Limiting

- Гостевые запросы: 100 запросов / 15 минут
- Авторизованные пользователи: 1000 запросов / 15 минут
- API для администраторов: без ограничений

---

## Versioning

API версионируется через URL: `/api/v1/`, `/api/v2/`

При breaking changes создается новая версия, старая поддерживается минимум 6 месяцев.

---

*Документ по проектированию API v1.0*  
*Лабораторная работа №4*  
*Проект: ТехноМарт*

