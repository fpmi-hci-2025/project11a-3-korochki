# ТехноМарт - Backend API

REST API для интернет-магазина электроники ТехноМарт.

## 🚀 Технологический стек

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Database:** PostgreSQL 14+
- **ORM:** Sequelize 6.x
- **Authentication:** JWT (JSON Web Tokens)
- **Documentation:** Swagger/OpenAPI 3.0
- **Testing:** Jest + Supertest
- **CI/CD:** GitHub Actions
- **Containerization:** Docker + Docker Compose

## 📋 Требования

- Node.js >= 18.0.0
- PostgreSQL >= 14.0
- Docker (опционально)

## 🛠 Установка и запуск

### Локальный запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/korochki/technomart-backend.git
cd technomart-backend
```

2. Установить зависимости:
```bash
npm install
```

3. Создать файл `.env` на основе `env.example`:
```bash
cp env.example .env
```

4. Настроить переменные окружения в `.env`

5. Запустить PostgreSQL

6. Запустить миграции:
```bash
npm run db:migrate
```

7. Запустить приложение:
```bash
# Development
npm run dev

# Production
npm start
```

### Запуск через Docker

```bash
docker-compose up -d
```

API будет доступен по адресу: `http://localhost:3000`

## 📚 API Документация

После запуска сервера, документация Swagger доступна по адресу:
```
http://localhost:3000/api/docs
```

### Основные эндпоинты

#### Products (Товары)
- `GET /api/v1/products` - Получить список товаров
- `GET /api/v1/products/:id` - Получить товар по ID
- `POST /api/v1/products` - Создать товар (admin)
- `PUT /api/v1/products/:id` - Обновить товар (admin)
- `DELETE /api/v1/products/:id` - Удалить товар (admin)

#### Auth (Авторизация)
- `POST /api/v1/auth/register` - Регистрация
- `POST /api/v1/auth/login` - Вход

#### Cart (Корзина)
- `GET /api/v1/cart` - Получить корзину
- `POST /api/v1/cart/items` - Добавить товар
- `PUT /api/v1/cart/items/:id` - Обновить количество
- `DELETE /api/v1/cart/items/:id` - Удалить товар

#### Orders (Заказы)
- `GET /api/v1/orders` - Получить заказы
- `POST /api/v1/orders` - Создать заказ
- `GET /api/v1/orders/:id` - Получить заказ по ID

## 🧪 Тестирование

```bash
# Запустить все тесты
npm test

# Запустить с покрытием
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🔒 Безопасность

- Пароли хэшируются с использованием bcrypt
- JWT токены для авторизации
- Rate limiting на API эндпоинтах
- Helmet для безопасности HTTP заголовков
- Валидация входных данных

## 📁 Структура проекта

```
backend/
├── src/
│   ├── config/          # Конфигурация
│   ├── models/          # Модели Sequelize
│   ├── controllers/     # Контроллеры
│   ├── services/        # Бизнес-логика
│   ├── routes/          # Маршруты API
│   ├── middleware/      # Middleware
│   ├── utils/           # Утилиты
│   └── app.js           # Главный файл
├── tests/               # Тесты
├── docs/                # Документация
├── Dockerfile
├── package.json
└── README.md
```

## 🔄 CI/CD

GitHub Actions автоматически:
- Запускает линтер
- Выполняет тесты
- Проверяет покрытие кода
- Запускает SonarQube анализ
- Деплоит на Render (при пуше в main)

## 🚀 Деплой

### Render.com

1. Создать новый Web Service на Render
2. Подключить GitHub репозиторий
3. Настроить переменные окружения
4. Деплой произойдёт автоматически

### Переменные окружения для production:
- `NODE_ENV=production`
- `PORT=3000`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `JWT_SECRET` (сгенерировать сложный ключ!)
- `FRONTEND_URL`

## 👥 Команда

- **Team:** korochki
- **Группа:** 11а-3
- **Проект:** ТехноМарт - Интернет-магазин электроники

## 📄 Лицензия

ISC

