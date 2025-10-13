# Примеры API запросов - ТехноМарт

Этот документ содержит примеры HTTP запросов для тестирования API интернет-магазина ТехноМарт.

## Базовый URL

```
Production: https://api.technomart.com/api/v1
Staging: https://staging-api.technomart.com/api/v1
Local: http://localhost:3000/api/v1
```

---

## 1. Аутентификация

### 1.1 Регистрация нового пользователя

**Request:**
```http
POST /auth/register HTTP/1.1
Host: api.technomart.com
Content-Type: application/json

{
  "email": "ivan.petrov@example.com",
  "password": "SecurePass123!",
  "firstName": "Иван",
  "lastName": "Петров",
  "phone": "+79161234567"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Регистрация успешна. Проверьте email для подтверждения.",
  "data": {
    "userId": "550e8400-e29b-41d4-a716-446655440000",
    "email": "ivan.petrov@example.com"
  }
}
```

**cURL:**
```bash
curl -X POST https://api.technomart.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ivan.petrov@example.com",
    "password": "SecurePass123!",
    "firstName": "Иван",
    "lastName": "Петров",
    "phone": "+79161234567"
  }'
```

---

### 1.2 Вход в систему

**Request:**
```http
POST /auth/login HTTP/1.1
Host: api.technomart.com
Content-Type: application/json

{
  "email": "ivan.petrov@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJlbWFpbCI6Iml2YW4ucGV0cm92QGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzA1MzI3NjAwLCJleHAiOjE3MDUzMzEyMDB9.example_signature",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcwNTMyNzYwMCwiZXhwIjoxNzA3OTE5NjAwfQ.example_signature",
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "ivan.petrov@example.com",
      "firstName": "Иван",
      "lastName": "Петров",
      "role": "customer"
    }
  }
}
```

**cURL:**
```bash
curl -X POST https://api.technomart.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ivan.petrov@example.com",
    "password": "SecurePass123!"
  }'
```

---

### 1.3 Обновление токена

**Request:**
```http
POST /auth/refresh HTTP/1.1
Host: api.technomart.com
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 2. Профиль пользователя

### 2.1 Получить текущий профиль

**Request:**
```http
GET /users/me HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "ivan.petrov@example.com",
    "firstName": "Иван",
    "lastName": "Петров",
    "phone": "+79161234567",
    "dateOfBirth": "1990-05-15",
    "gender": "male",
    "role": "customer",
    "isActive": true,
    "createdAt": "2024-01-01T10:00:00Z"
  }
}
```

**cURL:**
```bash
curl -X GET https://api.technomart.com/api/v1/users/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

### 2.2 Добавить адрес доставки

**Request:**
```http
POST /users/me/addresses HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "country": "Россия",
  "city": "Москва",
  "street": "Тверская",
  "building": "1",
  "apartment": "10",
  "postalCode": "125009",
  "isDefault": true
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "country": "Россия",
    "city": "Москва",
    "street": "Тверская",
    "building": "1",
    "apartment": "10",
    "postalCode": "125009",
    "isDefault": true,
    "createdAt": "2024-01-15T14:30:00Z"
  }
}
```

---

## 3. Товары

### 3.1 Получить список товаров с фильтрами

**Request:**
```http
GET /products?page=1&limit=20&category=770e8400-e29b-41d4-a716-446655440002&minPrice=10000&maxPrice=150000&inStock=true&sort=price_asc HTTP/1.1
Host: api.technomart.com
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "880e8400-e29b-41d4-a716-446655440003",
        "name": "iPhone 15 Pro Max 256GB",
        "shortDescription": "Флагманский смартфон Apple с процессором A17 Pro",
        "price": 119999.00,
        "discountPrice": 109999.00,
        "sku": "IPHONE-15-PRO-256",
        "inStock": 15,
        "isActive": true,
        "category": {
          "id": "770e8400-e29b-41d4-a716-446655440002",
          "name": "Смартфоны",
          "slug": "smartphones"
        },
        "brand": {
          "id": "990e8400-e29b-41d4-a716-446655440004",
          "name": "Apple",
          "logo": "https://cdn.technomart.com/brands/apple.png"
        },
        "mainImage": "https://cdn.technomart.com/products/iphone15pro.jpg",
        "rating": {
          "average": 4.8,
          "totalReviews": 156
        }
      },
      {
        "id": "880e8400-e29b-41d4-a716-446655440005",
        "name": "Samsung Galaxy S24 Ultra 512GB",
        "shortDescription": "Премиальный смартфон Samsung",
        "price": 109999.00,
        "discountPrice": 99999.00,
        "sku": "SAMSUNG-S24-ULTRA-512",
        "inStock": 23,
        "isActive": true,
        "category": {
          "id": "770e8400-e29b-41d4-a716-446655440002",
          "name": "Смартфоны",
          "slug": "smartphones"
        },
        "brand": {
          "id": "990e8400-e29b-41d4-a716-446655440006",
          "name": "Samsung",
          "logo": "https://cdn.technomart.com/brands/samsung.png"
        },
        "mainImage": "https://cdn.technomart.com/products/galaxy-s24-ultra.jpg",
        "rating": {
          "average": 4.7,
          "totalReviews": 98
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 48,
      "totalPages": 3
    },
    "filters": {
      "categories": [
        {
          "id": "770e8400-e29b-41d4-a716-446655440002",
          "name": "Смартфоны",
          "slug": "smartphones"
        }
      ],
      "brands": [
        {
          "id": "990e8400-e29b-41d4-a716-446655440004",
          "name": "Apple",
          "logo": "https://cdn.technomart.com/brands/apple.png"
        },
        {
          "id": "990e8400-e29b-41d4-a716-446655440006",
          "name": "Samsung",
          "logo": "https://cdn.technomart.com/brands/samsung.png"
        }
      ],
      "priceRange": {
        "min": 9999.00,
        "max": 149999.00
      }
    }
  }
}
```

**cURL:**
```bash
curl -X GET "https://api.technomart.com/api/v1/products?page=1&limit=20&inStock=true&sort=price_asc"
```

---

### 3.2 Поиск товаров

**Request:**
```http
GET /products/search?q=iPhone%2015&page=1&limit=10 HTTP/1.1
Host: api.technomart.com
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "880e8400-e29b-41d4-a716-446655440003",
        "name": "iPhone 15 Pro Max 256GB",
        "shortDescription": "Флагманский смартфон Apple с процессором A17 Pro",
        "price": 119999.00,
        "discountPrice": 109999.00,
        "sku": "IPHONE-15-PRO-256",
        "inStock": 15,
        "isActive": true,
        "category": {
          "id": "770e8400-e29b-41d4-a716-446655440002",
          "name": "Смартфоны",
          "slug": "smartphones"
        },
        "brand": {
          "id": "990e8400-e29b-41d4-a716-446655440004",
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
      "limit": 10,
      "total": 3,
      "totalPages": 1
    },
    "query": "iPhone 15",
    "foundCount": 3
  }
}
```

**cURL:**
```bash
curl -X GET "https://api.technomart.com/api/v1/products/search?q=iPhone%2015"
```

---

### 3.3 Получить товар по ID

**Request:**
```http
GET /products/880e8400-e29b-41d4-a716-446655440003 HTTP/1.1
Host: api.technomart.com
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "name": "iPhone 15 Pro Max 256GB",
    "description": "iPhone 15 Pro Max — самый продвинутый iPhone. Он оснащён прочным титановым корпусом и передовым процессором A17 Pro. Система камер Pro позволяет делать невероятные фотографии и видео. А порт USB‑C даёт возможность быстро заряжать аккумулятор и передавать данные.",
    "shortDescription": "Флагманский смартфон Apple с процессором A17 Pro",
    "price": 119999.00,
    "discountPrice": 109999.00,
    "sku": "IPHONE-15-PRO-256",
    "weight": 0.221,
    "dimensions": "159.9 x 76.7 x 8.25 мм",
    "inStock": 15,
    "reservedStock": 3,
    "isActive": true,
    "category": {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "name": "Смартфоны",
      "slug": "smartphones"
    },
    "brand": {
      "id": "990e8400-e29b-41d4-a716-446655440004",
      "name": "Apple",
      "logo": "https://cdn.technomart.com/brands/apple.png",
      "website": "https://www.apple.com"
    },
    "images": [
      {
        "id": "aa0e8400-e29b-41d4-a716-446655440007",
        "url": "https://cdn.technomart.com/products/iphone15pro-1.jpg",
        "altText": "iPhone 15 Pro Max спереди",
        "isMain": true
      },
      {
        "id": "aa0e8400-e29b-41d4-a716-446655440008",
        "url": "https://cdn.technomart.com/products/iphone15pro-2.jpg",
        "altText": "iPhone 15 Pro Max сзади",
        "isMain": false
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
      },
      {
        "name": "Встроенная память",
        "value": "256",
        "unit": "ГБ"
      },
      {
        "name": "Диагональ экрана",
        "value": "6.7",
        "unit": "дюймов"
      },
      {
        "name": "Разрешение экрана",
        "value": "2796x1290",
        "unit": "пикселей"
      },
      {
        "name": "Основная камера",
        "value": "48",
        "unit": "Мп"
      },
      {
        "name": "Емкость аккумулятора",
        "value": "4422",
        "unit": "мАч"
      },
      {
        "name": "Операционная система",
        "value": "iOS 17",
        "unit": null
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

## 4. Корзина

### 4.1 Получить корзину

**Request:**
```http
GET /cart HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "bb0e8400-e29b-41d4-a716-446655440009",
    "items": [
      {
        "id": "cc0e8400-e29b-41d4-a716-446655440010",
        "product": {
          "id": "880e8400-e29b-41d4-a716-446655440003",
          "name": "iPhone 15 Pro Max 256GB",
          "price": 119999.00,
          "discountPrice": 109999.00,
          "sku": "IPHONE-15-PRO-256",
          "mainImage": "https://cdn.technomart.com/products/iphone15pro.jpg",
          "inStock": 15
        },
        "quantity": 1,
        "subtotal": 109999.00,
        "addedAt": "2024-01-15T10:00:00Z"
      },
      {
        "id": "cc0e8400-e29b-41d4-a716-446655440011",
        "product": {
          "id": "880e8400-e29b-41d4-a716-446655440012",
          "name": "AirPods Pro (2nd generation)",
          "price": 24999.00,
          "discountPrice": null,
          "sku": "AIRPODS-PRO-2",
          "mainImage": "https://cdn.technomart.com/products/airpods-pro.jpg",
          "inStock": 50
        },
        "quantity": 2,
        "subtotal": 49998.00,
        "addedAt": "2024-01-15T11:30:00Z"
      }
    ],
    "summary": {
      "itemsCount": 3,
      "subtotal": 159997.00,
      "discount": 10000.00,
      "total": 149997.00
    }
  }
}
```

---

### 4.2 Добавить товар в корзину

**Request:**
```http
POST /cart/items HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": "880e8400-e29b-41d4-a716-446655440003",
  "quantity": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "cc0e8400-e29b-41d4-a716-446655440010",
    "product": {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "name": "iPhone 15 Pro Max 256GB",
      "price": 119999.00,
      "discountPrice": 109999.00,
      "sku": "IPHONE-15-PRO-256",
      "mainImage": "https://cdn.technomart.com/products/iphone15pro.jpg",
      "inStock": 15
    },
    "quantity": 1,
    "subtotal": 109999.00,
    "addedAt": "2024-01-15T10:00:00Z"
  }
}
```

**cURL:**
```bash
curl -X POST https://api.technomart.com/api/v1/cart/items \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "880e8400-e29b-41d4-a716-446655440003",
    "quantity": 1
  }'
```

---

## 5. Заказы

### 5.1 Создать заказ

**Request:**
```http
POST /orders HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

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
  "notes": "Позвоните за 30 минут до приезда курьера"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Заказ успешно создан",
  "data": {
    "id": "dd0e8400-e29b-41d4-a716-446655440013",
    "orderNumber": "ORD-2024-000123",
    "status": "created",
    "totalAmount": 150497.00,
    "paymentUrl": "https://payment.technomart.com/pay/dd0e8400-e29b-41d4-a716-446655440013",
    "createdAt": "2024-01-15T14:30:00Z"
  }
}
```

**cURL:**
```bash
curl -X POST https://api.technomart.com/api/v1/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deliveryAddress": {
      "country": "Россия",
      "city": "Москва",
      "street": "Тверская",
      "building": "1",
      "apartment": "10",
      "postalCode": "125009"
    },
    "deliveryMethod": "courier",
    "paymentMethod": "card"
  }'
```

---

### 5.2 Получить заказ по ID

**Request:**
```http
GET /orders/dd0e8400-e29b-41d4-a716-446655440013 HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "dd0e8400-e29b-41d4-a716-446655440013",
    "orderNumber": "ORD-2024-000123",
    "status": "shipped",
    "totalAmount": 150497.00,
    "discountAmount": 10000.00,
    "deliveryAmount": 500.00,
    "paymentMethod": "card",
    "deliveryMethod": "courier",
    "deliveryAddress": {
      "country": "Россия",
      "city": "Москва",
      "street": "Тверская",
      "building": "1",
      "apartment": "10",
      "postalCode": "125009"
    },
    "notes": "Позвоните за 30 минут до приезда курьера",
    "items": [
      {
        "id": "ee0e8400-e29b-41d4-a716-446655440014",
        "product": {
          "id": "880e8400-e29b-41d4-a716-446655440003",
          "name": "iPhone 15 Pro Max 256GB",
          "sku": "IPHONE-15-PRO-256",
          "mainImage": "https://cdn.technomart.com/products/iphone15pro.jpg"
        },
        "quantity": 1,
        "unitPrice": 109999.00,
        "totalPrice": 109999.00
      },
      {
        "id": "ee0e8400-e29b-41d4-a716-446655440015",
        "product": {
          "id": "880e8400-e29b-41d4-a716-446655440012",
          "name": "AirPods Pro (2nd generation)",
          "sku": "AIRPODS-PRO-2",
          "mainImage": "https://cdn.technomart.com/products/airpods-pro.jpg"
        },
        "quantity": 2,
        "unitPrice": 24999.00,
        "totalPrice": 49998.00
      }
    ],
    "payment": {
      "id": "ff0e8400-e29b-41d4-a716-446655440016",
      "status": "completed",
      "method": "card",
      "amount": 150497.00,
      "transactionId": "TRX-20240115-123456",
      "processedAt": "2024-01-15T14:35:00Z"
    },
    "delivery": {
      "id": "ff0e8400-e29b-41d4-a716-446655440017",
      "status": "in_transit",
      "method": "courier",
      "trackingNumber": "TRACK-123456789",
      "carrierName": "СДЭК",
      "estimatedDate": "2024-01-20T18:00:00Z",
      "actualDate": null
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
        "status": "processing",
        "timestamp": "2024-01-16T09:00:00Z"
      },
      {
        "status": "shipped",
        "timestamp": "2024-01-16T16:00:00Z"
      }
    ],
    "createdAt": "2024-01-15T14:30:00Z",
    "updatedAt": "2024-01-16T16:00:00Z"
  }
}
```

---

### 5.3 Отменить заказ

**Request:**
```http
PUT /orders/dd0e8400-e29b-41d4-a716-446655440013/cancel HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "reason": "Передумал покупать, нашел дешевле в другом магазине"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Заказ успешно отменен. Средства будут возвращены в течение 5-7 рабочих дней.",
  "data": {
    "id": "dd0e8400-e29b-41d4-a716-446655440013",
    "status": "cancelled",
    "cancelledAt": "2024-01-15T15:30:00Z",
    "cancelReason": "Передумал покупать, нашел дешевле в другом магазине"
  }
}
```

---

### 5.4 Получить список заказов

**Request:**
```http
GET /orders?status=delivered&page=1&limit=10 HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "dd0e8400-e29b-41d4-a716-446655440018",
        "orderNumber": "ORD-2024-000100",
        "status": "delivered",
        "totalAmount": 89999.00,
        "createdAt": "2024-01-10T12:00:00Z"
      },
      {
        "id": "dd0e8400-e29b-41d4-a716-446655440019",
        "orderNumber": "ORD-2024-000095",
        "status": "delivered",
        "totalAmount": 45000.00,
        "createdAt": "2024-01-05T09:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 12,
      "totalPages": 2
    }
  }
}
```

---

## 6. Отзывы

### 6.1 Создать отзыв

**Request:**
```http
POST /reviews HTTP/1.1
Host: api.technomart.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": "880e8400-e29b-41d4-a716-446655440003",
  "rating": 5,
  "title": "Отличный смартфон!",
  "content": "Очень доволен покупкой iPhone 15 Pro Max. Камера действительно потрясающая, особенно в ночном режиме. Процессор A17 Pro справляется со всеми задачами мгновенно. Батарея держит весь день активного использования. Титановый корпус приятный на ощупь и легче предыдущих моделей.",
  "pros": "Отличная камера, мощный процессор, красивый дисайн, большой экран, хорошая автономность",
  "cons": "Высокая цена, нет зарядного устройства в комплекте",
  "isRecommended": true,
  "images": [
    "https://cdn.technomart.com/reviews/user-photo-1.jpg",
    "https://cdn.technomart.com/reviews/user-photo-2.jpg"
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Отзыв отправлен на модерацию. После проверки он появится на сайте.",
  "data": {
    "id": "gg0e8400-e29b-41d4-a716-446655440020",
    "product": {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "name": "iPhone 15 Pro Max 256GB",
      "sku": "IPHONE-15-PRO-256",
      "mainImage": "https://cdn.technomart.com/products/iphone15pro.jpg"
    },
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "firstName": "Иван",
      "lastName": "Петров"
    },
    "rating": 5,
    "title": "Отличный смартфон!",
    "content": "Очень доволен покупкой iPhone 15 Pro Max...",
    "pros": "Отличная камера, мощный процессор...",
    "cons": "Высокая цена, нет зарядного устройства в комплекте",
    "isRecommended": true,
    "status": "pending",
    "images": [
      {
        "url": "https://cdn.technomart.com/reviews/user-photo-1.jpg",
        "caption": null
      },
      {
        "url": "https://cdn.technomart.com/reviews/user-photo-2.jpg",
        "caption": null
      }
    ],
    "createdAt": "2024-01-20T10:00:00Z"
  }
}
```

**cURL:**
```bash
curl -X POST https://api.technomart.com/api/v1/reviews \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "880e8400-e29b-41d4-a716-446655440003",
    "rating": 5,
    "title": "Отличный смартфон!",
    "content": "Очень доволен покупкой...",
    "pros": "Отличная камера, мощный процессор",
    "cons": "Высокая цена",
    "isRecommended": true
  }'
```

---

### 6.2 Получить отзывы товара

**Request:**
```http
GET /reviews?productId=880e8400-e29b-41d4-a716-446655440003&sort=helpful&page=1&limit=10 HTTP/1.1
Host: api.technomart.com
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "gg0e8400-e29b-41d4-a716-446655440021",
        "product": {
          "id": "880e8400-e29b-41d4-a716-446655440003",
          "name": "iPhone 15 Pro Max 256GB"
        },
        "user": {
          "id": "550e8400-e29b-41d4-a716-446655440022",
          "firstName": "Мария",
          "lastName": "Иванова"
        },
        "rating": 5,
        "title": "Лучший iPhone!",
        "content": "Перешла с iPhone 13 Pro. Разница колоссальная!",
        "pros": "Камера, производительность",
        "cons": "Цена",
        "isRecommended": true,
        "status": "approved",
        "images": [],
        "helpfulness": {
          "helpful": 45,
          "notHelpful": 2
        },
        "createdAt": "2024-01-18T14:20:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 156,
      "totalPages": 16
    }
  }
}
```

---

## 7. Ошибки

### 7.1 Ошибка валидации (400)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Ошибка валидации данных",
    "details": [
      {
        "field": "email",
        "message": "Некорректный формат email"
      },
      {
        "field": "password",
        "message": "Пароль должен содержать минимум 8 символов"
      }
    ]
  }
}
```

### 7.2 Не авторизован (401)

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Требуется аутентификация. Пожалуйста, войдите в систему."
  }
}
```

### 7.3 Недостаточно прав (403)

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Недостаточно прав для выполнения этой операции"
  }
}
```

### 7.4 Не найдено (404)

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Ресурс не найден"
  }
}
```

### 7.5 Конфликт данных (409)

```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Пользователь с таким email уже существует"
  }
}
```

### 7.6 Превышен лимит запросов (429)

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Превышен лимит запросов. Попробуйте через 15 минут.",
    "retryAfter": 900
  }
}
```

---

## 8. Postman Collection

Для импорта в Postman используйте OpenAPI спецификацию из файла `openapi-specification.yaml`.

**Шаги:**
1. Откройте Postman
2. Import → Link → вставьте URL спецификации или загрузите файл
3. Postman автоматически создаст коллекцию с всеми эндпоинтами

---

## 9. Swagger UI

Документация API доступна через Swagger UI:

**URL:** https://api.technomart.com/docs

Swagger UI предоставляет интерактивный интерфейс для тестирования API прямо в браузере.

---

*Примеры запросов API v1.0*  
*Лабораторная работа №4*  
*Проект: ТехноМарт*

