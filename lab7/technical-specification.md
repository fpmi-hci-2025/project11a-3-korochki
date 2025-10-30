# Техническое задание на разработку серверной части

**Проект:** ТехноМарт - Интернет-магазин электроники  
**Команда:** korochki  
**Группа:** 11а-3

---

## 1. Общие положения

### 1.1. Наименование проекта
Интернет-магазин электроники "ТехноМарт"

### 1.2. Основание для разработки
- Лабораторная работа №4: Моделирование требований, база данных, API дизайн
- Лабораторная работа №5: Дизайн прототипа приложения
- Лабораторная работа №6: Тестирование и оценка качества прототипа

### 1.3. Цель разработки
Создание полнофункциональной серверной части (backend) с REST API для управления интернет-магазином электроники, включая:
- Управление товарами и категориями
- Работа с корзиной и избранным
- Оформление и обработка заказов
- Управление пользователями и авторизация
- Система отзывов и рейтингов

---

## 2. Требования к системе

### 2.1. Функциональные требования

#### 2.1.1. Управление товарами
- **FR-1.1**: Получение списка товаров с фильтрацией и сортировкой
- **FR-1.2**: Получение детальной информации о товаре
- **FR-1.3**: Поиск товаров по названию и характеристикам
- **FR-1.4**: Фильтрация по категориям, брендам, цене, рейтингу
- **FR-1.5**: Сравнение товаров

#### 2.1.2. Управление пользователями
- **FR-2.1**: Регистрация пользователя
- **FR-2.2**: Авторизация (email + пароль)
- **FR-2.3**: Восстановление пароля
- **FR-2.4**: Управление профилем
- **FR-2.5**: История заказов

#### 2.1.3. Корзина покупок
- **FR-3.1**: Добавление товара в корзину
- **FR-3.2**: Изменение количества товаров
- **FR-3.3**: Удаление товара из корзины
- **FR-3.4**: Очистка корзины
- **FR-3.5**: Расчёт общей стоимости

#### 2.1.4. Избранное
- **FR-4.1**: Добавление товара в избранное
- **FR-4.2**: Удаление из избранного
- **FR-4.3**: Просмотр списка избранного

#### 2.1.5. Оформление заказов
- **FR-5.1**: Создание заказа из корзины
- **FR-5.2**: Указание адреса доставки
- **FR-5.3**: Выбор способа оплаты
- **FR-5.4**: Отслеживание статуса заказа
- **FR-5.5**: Отмена заказа

#### 2.1.6. Отзывы и рейтинги
- **FR-6.1**: Добавление отзыва на товар
- **FR-6.2**: Оценка товара (1-5 звёзд)
- **FR-6.3**: Модерация отзывов
- **FR-6.4**: Расчёт среднего рейтинга

### 2.2. Нефункциональные требования

#### 2.2.1. Производительность
- **NFR-1.1**: Время отклика API < 200ms для 95% запросов
- **NFR-1.2**: Поддержка 100+ одновременных пользователей
- **NFR-1.3**: Кэширование часто запрашиваемых данных

#### 2.2.2. Безопасность
- **NFR-2.1**: Хэширование паролей (bcrypt)
- **NFR-2.2**: JWT токены для авторизации
- **NFR-2.3**: HTTPS для всех соединений
- **NFR-2.4**: Валидация всех входных данных
- **NFR-2.5**: Защита от SQL injection

#### 2.2.3. Масштабируемость
- **NFR-3.1**: Модульная архитектура
- **NFR-3.2**: Разделение бизнес-логики и слоя данных
- **NFR-3.3**: Возможность горизонтального масштабирования

#### 2.2.4. Надёжность
- **NFR-4.1**: Автоматическое резервное копирование БД
- **NFR-4.2**: Логирование всех операций
- **NFR-4.3**: Обработка ошибок с понятными сообщениями

#### 2.2.5. Поддерживаемость
- **NFR-5.1**: Документация API (OpenAPI/Swagger)
- **NFR-5.2**: Unit-тесты (покрытие > 70%)
- **NFR-5.3**: Чистый и читаемый код
- **NFR-5.4**: CI/CD pipeline (GitHub Actions)

---

## 3. Архитектура системы

### 3.1. Технологический стек

**Backend:**
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL 14+
- **ORM**: Sequelize / Prisma
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: express-validator / Joi
- **Testing**: Jest + Supertest
- **Documentation**: Swagger (swagger-ui-express)

**Frontend (первая страница):**
- **Framework**: React 18+
- **Build tool**: Vite
- **Styling**: CSS Modules / Styled Components
- **State Management**: React Context / Redux Toolkit
- **HTTP Client**: Axios

**DevOps:**
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier, SonarQube
- **Hosting**: Render.com (backend), Vercel (frontend)

### 3.2. Архитектурные паттерны
- **MVC** (Model-View-Controller)
- **RESTful API** design
- **Repository Pattern** для работы с БД
- **Service Layer** для бизнес-логики
- **Middleware** для обработки запросов

### 3.3. Структура проекта

```
lab7/
├── backend/
│   ├── src/
│   │   ├── config/         # Конфигурация (DB, JWT, etc.)
│   │   ├── models/         # Модели данных (Sequelize)
│   │   ├── controllers/    # Контроллеры (обработка запросов)
│   │   ├── services/       # Бизнес-логика
│   │   ├── routes/         # Маршруты API
│   │   ├── middleware/     # Middleware (auth, validation, error)
│   │   ├── utils/          # Вспомогательные функции
│   │   └── app.js          # Главный файл приложения
│   ├── tests/              # Unit и integration тесты
│   ├── docs/               # Swagger документация
│   ├── .env.example        # Пример переменных окружения
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/          # Страницы
│   │   ├── services/       # API клиент
│   │   ├── hooks/          # Custom hooks
│   │   ├── styles/         # Стили
│   │   ├── utils/          # Утилиты
│   │   ├── App.jsx         # Главный компонент
│   │   └── main.jsx        # Точка входа
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .github/
│   └── workflows/          # GitHub Actions
├── docker-compose.yml
└── README.md
```

---

## 4. Описание API

### 4.1. Базовый URL
```
Development: http://localhost:3000/api/v1
Production: https://technomart-api.onrender.com/api/v1
```

### 4.2. Основные эндпоинты

#### 4.2.1. Products (Товары)
```
GET    /products              - Получить список товаров
GET    /products/:id          - Получить товар по ID
GET    /products/search       - Поиск товаров
GET    /products/category/:id - Товары по категории
POST   /products              - Создать товар (admin)
PUT    /products/:id          - Обновить товар (admin)
DELETE /products/:id          - Удалить товар (admin)
```

#### 4.2.2. Categories (Категории)
```
GET    /categories            - Получить все категории
GET    /categories/:id        - Получить категорию по ID
POST   /categories            - Создать категорию (admin)
PUT    /categories/:id        - Обновить категорию (admin)
DELETE /categories/:id        - Удалить категорию (admin)
```

#### 4.2.3. Users (Пользователи)
```
POST   /auth/register         - Регистрация
POST   /auth/login            - Авторизация
POST   /auth/logout           - Выход
GET    /users/profile         - Получить профиль (auth)
PUT    /users/profile         - Обновить профиль (auth)
POST   /auth/forgot-password  - Восстановление пароля
POST   /auth/reset-password   - Сброс пароля
```

#### 4.2.4. Cart (Корзина)
```
GET    /cart                  - Получить корзину (auth)
POST   /cart/items            - Добавить товар в корзину (auth)
PUT    /cart/items/:id        - Обновить количество (auth)
DELETE /cart/items/:id        - Удалить из корзины (auth)
DELETE /cart                  - Очистить корзину (auth)
```

#### 4.2.5. Favorites (Избранное)
```
GET    /favorites             - Получить избранное (auth)
POST   /favorites             - Добавить в избранное (auth)
DELETE /favorites/:productId  - Удалить из избранного (auth)
```

#### 4.2.6. Orders (Заказы)
```
GET    /orders                - Получить заказы (auth)
GET    /orders/:id            - Получить заказ по ID (auth)
POST   /orders                - Создать заказ (auth)
PUT    /orders/:id/cancel     - Отменить заказ (auth)
PUT    /orders/:id/status     - Обновить статус (admin)
```

#### 4.2.7. Reviews (Отзывы)
```
GET    /products/:id/reviews  - Получить отзывы товара
POST   /products/:id/reviews  - Добавить отзыв (auth)
PUT    /reviews/:id           - Обновить отзыв (auth)
DELETE /reviews/:id           - Удалить отзыв (auth/admin)
```

### 4.3. Формат ответов

**Успешный ответ:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Операция выполнена успешно"
}
```

**Ошибка:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Ошибка валидации",
    "details": [...]
  }
}
```

### 4.4. Коды ответов
- **200** - OK (успешный запрос)
- **201** - Created (ресурс создан)
- **400** - Bad Request (неверные данные)
- **401** - Unauthorized (требуется авторизация)
- **403** - Forbidden (нет прав доступа)
- **404** - Not Found (ресурс не найден)
- **500** - Internal Server Error (ошибка сервера)

---

## 5. Модель данных

### 5.1. Основные сущности

#### 5.1.1. User (Пользователь)
```
id: UUID (PK)
email: String (unique, not null)
password_hash: String (not null)
first_name: String
last_name: String
phone: String
role: Enum('user', 'admin')
created_at: Timestamp
updated_at: Timestamp
```

#### 5.1.2. Product (Товар)
```
id: UUID (PK)
name: String (not null)
description: Text
price: Decimal (not null)
old_price: Decimal (nullable)
category_id: UUID (FK -> Category)
brand: String
image_url: String
specs: JSON
in_stock: Boolean
rating: Decimal (0-5)
reviews_count: Integer
created_at: Timestamp
updated_at: Timestamp
```

#### 5.1.3. Category (Категория)
```
id: UUID (PK)
name: String (not null)
slug: String (unique)
description: Text
parent_id: UUID (FK -> Category, nullable)
image_url: String
created_at: Timestamp
```

#### 5.1.4. Cart (Корзина)
```
id: UUID (PK)
user_id: UUID (FK -> User)
created_at: Timestamp
updated_at: Timestamp
```

#### 5.1.5. CartItem (Элемент корзины)
```
id: UUID (PK)
cart_id: UUID (FK -> Cart)
product_id: UUID (FK -> Product)
quantity: Integer (default: 1)
price: Decimal (snapshot)
created_at: Timestamp
```

#### 5.1.6. Order (Заказ)
```
id: UUID (PK)
user_id: UUID (FK -> User)
status: Enum('pending', 'processing', 'shipped', 'delivered', 'cancelled')
total_amount: Decimal
shipping_address: JSON
payment_method: Enum('card', 'cash')
created_at: Timestamp
updated_at: Timestamp
```

#### 5.1.7. OrderItem (Элемент заказа)
```
id: UUID (PK)
order_id: UUID (FK -> Order)
product_id: UUID (FK -> Product)
quantity: Integer
price: Decimal (snapshot)
product_name: String (snapshot)
```

#### 5.1.8. Review (Отзыв)
```
id: UUID (PK)
product_id: UUID (FK -> Product)
user_id: UUID (FK -> User)
rating: Integer (1-5)
title: String
comment: Text
created_at: Timestamp
updated_at: Timestamp
```

#### 5.1.9. Favorite (Избранное)
```
id: UUID (PK)
user_id: UUID (FK -> User)
product_id: UUID (FK -> Product)
created_at: Timestamp
```

---

## 6. План разработки

### 6.1. Этап 1: Инфраструктура (2-3 дня)
- [x] Создание структуры проекта
- [ ] Настройка Express.js сервера
- [ ] Подключение PostgreSQL
- [ ] Настройка Docker
- [ ] Базовая конфигурация

### 6.2. Этап 2: Модели и миграции (2 дня)
- [ ] Создание моделей Sequelize
- [ ] Миграции базы данных
- [ ] Seeders для тестовых данных

### 6.3. Этап 3: API эндпоинты (5-7 дней)
- [ ] Products API
- [ ] Users & Auth API
- [ ] Cart API
- [ ] Orders API
- [ ] Reviews API
- [ ] Favorites API

### 6.4. Этап 4: Тестирование (2-3 дня)
- [ ] Unit-тесты для сервисов
- [ ] Integration-тесты для API
- [ ] Настройка Jest

### 6.5. Этап 5: Документация (1-2 дня)
- [ ] Swagger/OpenAPI спецификация
- [ ] README с инструкциями
- [ ] Примеры запросов

### 6.6. Этап 6: Frontend (3-4 дня)
- [ ] Настройка React проекта
- [ ] Главная страница
- [ ] Каталог товаров
- [ ] Интеграция с API

### 6.7. Этап 7: CI/CD (1-2 дня)
- [ ] GitHub Actions workflow
- [ ] SonarQube интеграция
- [ ] Автоматический деплой

### 6.8. Этап 8: Деплой (1 день)
- [ ] Деплой backend на Render
- [ ] Деплой frontend на Vercel
- [ ] Настройка production окружения

---

## 7. Критерии приемки

### 7.1. Backend
- [x] Все API эндпоинты работают согласно спецификации
- [ ] Покрытие тестами > 70%
- [ ] Документация API (Swagger) доступна
- [ ] Все запросы проходят валидацию
- [ ] Обработка ошибок реализована корректно

### 7.2. Frontend
- [ ] Главная страница отображается корректно
- [ ] Данные загружаются из API
- [ ] Responsive design (desktop + mobile)
- [ ] Обработка loading и error состояний

### 7.3. DevOps
- [ ] Docker-контейнеры запускаются без ошибок
- [ ] CI/CD pipeline работает
- [ ] Приложение задеплоено и доступно онлайн
- [ ] SonarQube показывает quality gate "passed"

### 7.4. Документация
- [ ] README с инструкциями по запуску
- [ ] Техническое задание
- [ ] API документация
- [ ] Итоговый отчёт

---

## 8. Риски и ограничения

### 8.1. Риски
- **Р1**: Сложность интеграции всех компонентов
  - *Митигация*: Модульная разработка, тщательное тестирование
- **Р2**: Проблемы с деплоем на бесплатных платформах
  - *Митигация*: Резервные варианты хостинга
- **Р3**: Нехватка времени на полную реализацию
  - *Митигация*: Приоритизация функционала (MoSCoW)

### 8.2. Ограничения
- Бесплатный tier хостинга (ограничения по ресурсам)
- Один разработчик в команде
- Академические сроки

---

## 9. Команда и распределение задач

### 9.1. Участники
| Роль | Участник | Ответственность |
|------|----------|----------------|
| Full-stack Developer | Участник 1 | Backend API, Frontend, DevOps |
| Tech Lead | Участник 1 | Архитектура, код-ревью, документация |

### 9.2. Распределение по задачам
**Backend (60%):**
- Модели и миграции - 10%
- API эндпоинты - 30%
- Тесты - 10%
- Документация - 10%

**Frontend (20%):**
- Настройка проекта - 5%
- Главная страница - 10%
- Интеграция с API - 5%

**DevOps (20%):**
- Docker - 5%
- CI/CD - 10%
- Деплой - 5%

---

## 10. Контакты и ресурсы

### 10.1. Репозитории
- Backend: `github.com/korochki/technomart-backend`
- Frontend: `github.com/korochki/technomart-frontend`

### 10.2. Окружения
- Development: `http://localhost:3000`
- Production Backend: `https://technomart-api.onrender.com`
- Production Frontend: `https://technomart.vercel.app`

### 10.3. Документация
- Swagger UI: `/api/docs`
- Postman Collection: `docs/postman/`
- OpenAPI Spec: `docs/openapi.yaml`

---

**Дата создания:** 30 октября 2025  
**Команда:** korochki  
**Группа:** 11а-3

