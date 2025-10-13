# Ссылки на документацию API - ТехноМарт

## Для тестирования API

### Swagger UI (рекомендуется)

**Онлайн редактор:**
1. Откройте https://editor.swagger.io
2. Загрузите файл `openapi-specification.yaml`
3. Тестируйте API интерактивно в браузере

**Локально (если развернут backend):**
```
http://localhost:3000/docs
```

### Postman

**Импорт коллекции:**
1. Откройте Postman
2. Import → Upload Files
3. Выберите `openapi-specification.yaml`
4. Коллекция создастся автоматически

**Переменные окружения:**
```
BASE_URL: http://localhost:3000/api/v1
ACCESS_TOKEN: <ваш токен после логина>
```

### cURL примеры

Все примеры запросов с cURL командами находятся в файле:
```
api-examples.md
```

## Документация

### Основные документы

| Документ | Описание |
|----------|----------|
| `README.md` | Быстрый старт и обзор |
| `lab4-report.md` | Полный отчет по лабораторной |
| `requirements-model.md` | Модель требований (Актер → User Story → Use Case) |
| `use-case-registry.md` | Реестр вариантов использования |
| `api-routes-endpoints.md` | Документация всех API эндпоинтов |
| `api-examples.md` | Примеры запросов с cURL |
| `database-schema.sql` | DDL скрипт PostgreSQL |
| `openapi-specification.yaml` | OpenAPI 3.0 спецификация |

### Диаграммы

| Файл | Описание |
|------|----------|
| `diagrams/logical-database-model.puml` | Логическая модель БД |
| `diagrams/physical-database-model.puml` | Физическая модель БД |

## Полезные инструменты

### Генерация кода

**Для клиента:**
```bash
# JavaScript/TypeScript
npx @openapitools/openapi-generator-cli generate \
  -i openapi-specification.yaml \
  -g typescript-axios \
  -o ./client

# Python
pip install openapi-generator-cli
openapi-generator generate -i openapi-specification.yaml -g python -o ./client
```

**Для сервера:**
```bash
# Node.js Express
npx @openapitools/openapi-generator-cli generate \
  -i openapi-specification.yaml \
  -g nodejs-express-server \
  -o ./server
```

### Mock Server

**Prism Mock Server:**
```bash
# Установка
npm install -g @stoplight/prism-cli

# Запуск
prism mock openapi-specification.yaml

# API будет доступно на http://127.0.0.1:4010
```

### Валидация спецификации

**Swagger CLI:**
```bash
# Установка
npm install -g @apidevtools/swagger-cli

# Валидация
swagger-cli validate openapi-specification.yaml
```

## Быстрые команды

### База данных

```bash
# Создать БД
createdb technomart

# Развернуть схему
psql -d technomart -f database-schema.sql

# Подключиться
psql -d technomart

# Список таблиц
\dt technomart.*

# Описание таблицы
\d technomart.products
```

### API запросы

```bash
# Переменные
export API_URL="http://localhost:3000/api/v1"
export TOKEN="<ваш токен>"

# Регистрация
curl -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!",...}'

# Логин
curl -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'

# Получить товары
curl -X GET "$API_URL/products?page=1&limit=20"

# Получить профиль
curl -X GET $API_URL/users/me \
  -H "Authorization: Bearer $TOKEN"
```

## Онлайн сервисы

### Для тестирования

| Сервис | URL | Назначение |
|--------|-----|------------|
| Swagger Editor | https://editor.swagger.io | Редактирование и тестирование OpenAPI |
| Swagger UI | https://petstore.swagger.io | Пример интерактивной документации |
| ReqBin | https://reqbin.com | Тестирование HTTP запросов |
| JSONPlaceholder | https://jsonplaceholder.typicode.com | Mock API для прототипирования |

### Для валидации

| Сервис | URL | Назначение |
|--------|-----|------------|
| Swagger Validator | https://validator.swagger.io | Валидация OpenAPI spec |
| JSON Schema Validator | https://www.jsonschemavalidator.net | Валидация JSON схем |

### Для документирования

| Сервис | URL | Назначение |
|--------|-----|------------|
| SwaggerHub | https://app.swaggerhub.com | Хостинг API документации |
| Stoplight | https://stoplight.io | Платформа для API дизайна |
| Readme.io | https://readme.com | Документация для разработчиков |

## Примеры использования

### 1. Тестирование в Swagger Editor

```
1. Откройте https://editor.swagger.io
2. File → Import File → выберите openapi-specification.yaml
3. В правой панели появится интерактивная документация
4. Нажмите "Try it out" на любом эндпоинте
5. Заполните параметры и нажмите "Execute"
```

### 2. Импорт в Postman

```
1. Откройте Postman
2. Collections → Import
3. Upload Files → выберите openapi-specification.yaml
4. Postman создаст коллекцию "ТехноМарт API"
5. Настройте переменные:
   - {{baseUrl}}: http://localhost:3000/api/v1
   - {{accessToken}}: <токен после логина>
```

### 3. Генерация клиента TypeScript

```bash
# Установка генератора
npm install -g @openapitools/openapi-generator-cli

# Генерация
openapi-generator-cli generate \
  -i openapi-specification.yaml \
  -g typescript-axios \
  -o ./generated-client

# Использование в коде
import { DefaultApi } from './generated-client';

const api = new DefaultApi({
  basePath: 'http://localhost:3000/api/v1',
  accessToken: 'YOUR_TOKEN'
});

// Получить товары
const products = await api.getProducts(1, 20);
```

### 4. Запуск Mock Server

```bash
# Установка Prism
npm install -g @stoplight/prism-cli

# Запуск Mock Server
prism mock openapi-specification.yaml

# Server started at http://127.0.0.1:4010
# Теперь можно делать запросы:

curl http://127.0.0.1:4010/products
curl http://127.0.0.1:4010/products/123
```

## Рекомендации

### Для Frontend разработчиков

1. Используйте Mock Server (Prism) для разработки до готовности backend
2. Сгенерируйте типизированный клиент (TypeScript) для type safety
3. Используйте Swagger UI для понимания всех эндпоинтов
4. Сохраните примеры из `api-examples.md` в Postman коллекцию

### Для Backend разработчиков

1. Используйте OpenAPI spec как контракт API
2. Сгенерируйте серверные заглушки для быстрого старта
3. Настройте автоматическую валидацию запросов/ответов
4. Используйте `database-schema.sql` для развертывания БД

### Для QA инженеров

1. Импортируйте OpenAPI spec в Postman для тестов
2. Используйте `use-case-registry.md` для создания тест-кейсов
3. Проверьте все статус коды из `api-routes-endpoints.md`
4. Автоматизируйте тесты на основе примеров из `api-examples.md`

## Контакты и поддержка

**Проект:** ТехноМарт  
**Курс:** Проектирование человеко-машинных интерфейсов  
**Год:** 2024

**Документация:**
- Все файлы в папке `lab4/`
- Основной отчет: `lab4-report.md`
- Быстрый старт: `README.md`

**API Support Email:** support@technomart.com  
**API Documentation:** https://api.technomart.com/docs

---

*Последнее обновление: 2024*

