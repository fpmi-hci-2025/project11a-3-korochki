# Лабораторная работа №9 — ТехноМарт

## Интернет-магазин электроники

Финальная интеграция и развёртывание fullstack веб-приложения.

## 🚀 Быстрый старт

### Backend

```bash
cd lab9/backend
npm install
npm run seed    # Заполнить БД тестовыми данными
npm run dev     # Запустить сервер (http://localhost:3000)
```

### Frontend

```bash
cd lab9/frontend
npm install
npm run dev     # Запустить (http://localhost:5173)
```

### Docker

```bash
cd lab9
docker-compose up --build
```

## 📁 Структура проекта

```
lab9/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── db/             # SQLite database
│   │   ├── middleware/     # Auth middleware
│   │   ├── routes/         # API routes
│   │   └── seeders/        # Test data
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # React SPA
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # UI components
│   │   ├── context/       # Auth & Cart state
│   │   ├── pages/         # Page components
│   │   └── styles/        # CSS
│   └── package.json
│
├── .github/workflows/      # CI/CD
├── presentation.html       # Презентация проекта
└── docker-compose.yml
```

## 🔑 Тестовые данные

После запуска `npm run seed`:

| Role  | Email              | Password |
|-------|--------------------|----------|
| Admin | admin@technomart.by | admin123 |
| User  | user@test.com      | user123  |

## 📋 API Endpoints

### Auth
- `POST /api/auth/register` — Регистрация
- `POST /api/auth/login` — Авторизация
- `GET /api/auth/me` — Текущий пользователь

### Products
- `GET /api/products` — Список товаров (с фильтрацией)
- `GET /api/products/:id` — Товар по ID

### Categories
- `GET /api/categories` — Все категории

### Cart
- `GET /api/cart` — Корзина пользователя
- `POST /api/cart/items` — Добавить в корзину
- `PUT /api/cart/items/:id` — Изменить количество
- `DELETE /api/cart/items/:id` — Удалить из корзины

### Orders
- `GET /api/orders` — Заказы пользователя
- `POST /api/orders` — Создать заказ
- `PUT /api/orders/:id/cancel` — Отменить заказ

### Reviews
- `GET /api/reviews/product/:id` — Отзывы товара
- `POST /api/reviews` — Добавить отзыв

## 🛠️ Технологии

**Backend:** Node.js, Express, SQLite, JWT, bcrypt

**Frontend:** React 18, React Router, Vite, Axios, Context API

**DevOps:** Docker, GitHub Actions, Render, Vercel

## 📊 Выполненные требования Lab 9

- ✅ Финальный отчёт с диаграммами
- ✅ Завершение реализации (БД, сессии, аутентификация, валидация)
- ✅ CI/CD через GitHub Actions
- ✅ Проверка качества кода
- ✅ Тестирование по чек-листу
- ✅ Логотип и favicon
- ✅ Презентация проекта
- ✅ Подготовка к деплою

## 👥 Команда

**korochki** | Группа 11а-3 | БГУ ФПМИ

---

© 2024 ТехноМарт
