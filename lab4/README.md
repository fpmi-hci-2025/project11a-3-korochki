# Лабораторная работа №4 - Проектирование механизмов интеграции

## Описание

Проектирование и документирование API для интернет-магазина электроники ТехноМарт, включая модель требований, физическую модель базы данных и полную спецификацию REST API.

## Цели работы

- Получить навыки проектирования и документирования API
- Разработать модель требований и реестр вариантов использования
- Спроектировать физическую модель базы данных
- Создать спецификацию OpenAPI с примерами запросов

## Структура проекта

```
lab4/
├── diagrams/                          # Диаграммы PlantUML
│   ├── logical-database-model.puml    # Логическая модель БД
│   └── physical-database-model.puml   # Физическая модель БД
├── requirements-model.md              # Модель требований (Актер → User Story → Use Case)
├── use-case-registry.md               # Реестр вариантов использования
├── api-routes-endpoints.md            # Документация API маршрутов и эндпоинтов
├── api-examples.md                    # Примеры API запросов с cURL
├── database-schema.sql                # SQL DDL скрипт для PostgreSQL
├── openapi-specification.yaml         # OpenAPI 3.0 спецификация
├── lab4-report.md                     # Итоговый отчет
└── README.md                          # Этот файл
```

## Выполненные задания

### ✅ Задание 1: Модель требований

Создана полная модель требований в формате **Действующее лицо → User Story → Use Case**:

- **5 действующих лиц:** Гость, Покупатель, Администратор, Менеджер, Курьер
- **21 User Story** с Acceptance Criteria
- **24 Use Cases** с детальным описанием
- Приоритизация по методу MoSCoW

**Файлы:**
- `requirements-model.md` - Модель требований
- `use-case-registry.md` - Реестр UC с детальным описанием

### ✅ Задание 2: Физическая модель БД

Разработана физическая модель базы данных для PostgreSQL:

- **18 таблиц** с полным набором ограничений
- **40+ индексов** (B-tree, GIN, Partial)
- **12 триггеров** для автоматизации
- **2 представления** для упрощения запросов
- **RLS политики** для безопасности

**Файлы:**
- `diagrams/logical-database-model.puml` - Логическая модель
- `diagrams/physical-database-model.puml` - Физическая модель
- `database-schema.sql` - DDL скрипт (800+ строк)

### ✅ Задание 3: Маршруты и конечные точки API

Спроектированы RESTful API маршруты:

- **70+ конечных точек** в 8 модулях
- **Сопоставление с Use Cases** из лаб. работы 3
- **5 ролей** с разграничением доступа
- **Rate Limiting** для защиты от злоупотреблений

**Файлы:**
- `api-routes-endpoints.md` - Полная документация API

### ✅ Задание 4: OpenAPI спецификация

Создана спецификация OpenAPI 3.0:

- **15+ задокументированных эндпоинтов**
- **15+ переиспользуемых схем данных**
- **15+ примеров запросов** с cURL
- Готово к импорту в Swagger UI и Postman

**Файлы:**
- `openapi-specification.yaml` - OpenAPI 3.0 spec (900+ строк)
- `api-examples.md` - Примеры запросов

## Быстрый старт

### Просмотр документации

1. **OpenAPI в Swagger Editor:**
   - Перейдите на https://editor.swagger.io
   - Загрузите файл `openapi-specification.yaml`
   - Интерактивно изучайте и тестируйте API

2. **Импорт в Postman:**
   ```bash
   # В Postman: Import → Upload Files → openapi-specification.yaml
   ```

### Развертывание базы данных

```bash
# Создать базу данных PostgreSQL
createdb technomart

# Выполнить DDL скрипт
psql -d technomart -f database-schema.sql

# Проверить созданные таблицы
psql -d technomart -c "\dt technomart.*"
```

### Тестирование API

```bash
# Регистрация
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "firstName": "Иван",
    "lastName": "Петров"
  }'

# Получение товаров
curl -X GET "http://localhost:3000/api/v1/products?page=1&limit=20"
```

Больше примеров в файле `api-examples.md`.

## Ключевые технологии

### База данных
- **PostgreSQL 14+** - основная СУБД
- **uuid-ossp** - генерация UUID
- **pg_trgm** - полнотекстовый поиск
- **JSONB** - гибкие структуры данных
- **Row Level Security** - политики безопасности

### API
- **REST** - архитектурный стиль
- **OpenAPI 3.0** - спецификация API
- **JWT** - аутентификация
- **JSON** - формат данных
- **HTTPS** - защищенное соединение

### Инструменты
- **PlantUML** - диаграммы
- **Swagger UI** - интерактивная документация
- **Postman** - тестирование API
- **cURL** - командная строка для запросов

## Основные эндпоинты API

### Аутентификация
```
POST   /api/v1/auth/register        # Регистрация
POST   /api/v1/auth/login           # Вход
POST   /api/v1/auth/refresh         # Обновление токена
```

### Товары
```
GET    /api/v1/products              # Список товаров
GET    /api/v1/products/search       # Поиск
GET    /api/v1/products/:id          # Детали товара
```

### Корзина
```
GET    /api/v1/cart                  # Получить корзину
POST   /api/v1/cart/items            # Добавить товар
DELETE /api/v1/cart/items/:id        # Удалить товар
```

### Заказы
```
GET    /api/v1/orders                # Список заказов
POST   /api/v1/orders                # Создать заказ
GET    /api/v1/orders/:id            # Детали заказа
PUT    /api/v1/orders/:id/cancel     # Отменить заказ
```

### Отзывы
```
GET    /api/v1/reviews               # Список отзывов
POST   /api/v1/reviews               # Создать отзыв
```

Полный список в файле `api-routes-endpoints.md`.

## Модель данных

### Основные сущности

```
users                    # Пользователи
├── addresses           # Адреса доставки
├── carts              # Корзины
│   └── cart_items     # Товары в корзине
├── orders             # Заказы
│   ├── order_items    # Позиции заказа
│   ├── payments       # Платежи
│   └── deliveries     # Доставки
└── reviews            # Отзывы
    ├── review_images  # Фото к отзывам
    └── review_helpfulness  # Оценки полезности

categories              # Категории (иерархия)
brands                  # Бренды
products                # Товары
├── product_images      # Изображения
├── product_characteristics  # Характеристики
└── product_ratings     # Рейтинги
```

### ER-диаграмма

Посмотрите диаграммы в PlantUML:
- `diagrams/logical-database-model.puml`
- `diagrams/physical-database-model.puml`

## Приоритизация требований

| Категория | Количество | Описание |
|-----------|------------|----------|
| **Must Have** | 8 | Критичные для MVP |
| **Should Have** | 11 | Важные для полноценной работы |
| **Could Have** | 5 | Желательные возможности |
| **Won't Have** | 1 | Отложено на будущее |

## Роли и доступ

| Роль | Описание | Права |
|------|----------|-------|
| **Guest** | Неавторизованный | Просмотр товаров, категорий, отзывов |
| **Customer** | Покупатель | Guest + корзина, заказы, отзывы |
| **Manager** | Менеджер | Customer + обработка заказов, модерация |
| **Admin** | Администратор | Полный доступ |
| **Courier** | Курьер | Управление доставками |

## HTTP Статус коды

| Код | Описание |
|-----|----------|
| **200** OK | Успешный GET/PUT/DELETE |
| **201** Created | Успешный POST |
| **400** Bad Request | Невалидные данные |
| **401** Unauthorized | Не авторизован |
| **403** Forbidden | Нет прав доступа |
| **404** Not Found | Ресурс не найден |
| **409** Conflict | Конфликт данных |
| **429** Too Many Requests | Превышен лимит |

## Статистика

| Метрика | Значение |
|---------|----------|
| Документов | 6 MD файлов |
| Диаграмм | 2 PlantUML |
| SQL скрипт | 800+ строк |
| OpenAPI spec | 900+ строк |
| **Всего кода** | **~5600 строк** |
| Таблиц БД | 18 |
| Индексов | 40+ |
| API эндпоинтов | 70+ |
| Use Cases | 24 |
| User Stories | 21 |

## Полезные ссылки

### Документация
- [OpenAPI Specification](https://swagger.io/specification/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT.io](https://jwt.io/)

### Инструменты
- [Swagger Editor](https://editor.swagger.io/)
- [Postman](https://www.postman.com/)
- [PlantUML](https://plantuml.com/)
- [pgAdmin](https://www.pgadmin.org/)

### Статьи
- [Проектирование REST API на примере интернет-магазина](https://habr.com/ru/post/351890/)
- [RESTful API Design Best Practices](https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [Database Design Best Practices](https://www.sqlshack.com/learn-sql-database-design-best-practices/)

## Следующие шаги

### Для группы 14 (завершено ✅)
- [x] Задание 1: Модель требований
- [x] Задание 2: Физическая модель БД
- [x] Задание 3: API маршруты
- [x] Задание 4: OpenAPI спецификация

### Для группы 12-13 (дополнительно)
- [ ] Создание структуры репозиториев
- [ ] Настройка CI/CD (GitHub Actions)
- [ ] Docker Compose для окружения
- [ ] SonarQube для качества кода
- [ ] Развертывание на Render/Vercel

## Авторы

Курс: Проектирование человеко-машинных интерфейсов  
Проект: ТехноМарт - Интернет-магазин электроники  
2024 г.

## Лицензия

MIT License - используйте свободно для образовательных целей.

