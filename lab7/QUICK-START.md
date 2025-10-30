# Быстрый старт - Lab 7

**Проект:** ТехноМарт Backend API  
**Технологии:** Node.js + Express + PostgreSQL

---

## 🚀 Запуск через Docker (Рекомендуется)

### 1. Установить Docker
Скачать и установить Docker Desktop:
- Windows/Mac: https://www.docker.com/products/docker-desktop

### 2. Запустить проект
```bash
# В корне lab7/
docker-compose up -d
```

### 3. Проверить работу
- **API:** http://localhost:3000/health
- **Swagger Docs:** http://localhost:3000/api/docs

### 4. Остановить
```bash
docker-compose down
```

---

## 💻 Локальный запуск (Разработка)

### Требования:
- Node.js 18+
- PostgreSQL 14+
- npm или yarn

### Шаги:

#### 1. Установить PostgreSQL
```bash
# Windows (через Chocolatey)
choco install postgresql

# Mac
brew install postgresql

# Linux
sudo apt-get install postgresql
```

#### 2. Создать базу данных
```bash
psql -U postgres
CREATE DATABASE technomart_db;
\q
```

#### 3. Установить зависимости
```bash
cd backend
npm install
```

#### 4. Настроить .env
```bash
# Скопировать пример
cp env.example .env

# Отредактировать .env:
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=technomart_db
DB_USER=postgres
DB_PASSWORD=ваш_пароль
JWT_SECRET=super-secret-key-change-this
```

#### 5. Запустить миграции (опционально)
```bash
npm run db:migrate
npm run db:seed
```

#### 6. Запустить сервер
```bash
# Development режим (с hot reload)
npm run dev

# Production режим
npm start
```

#### 7. Открыть браузер
- **Health Check:** http://localhost:3000/health
- **API Docs:** http://localhost:3000/api/docs

---

## 🧪 Запуск тестов

```bash
cd backend

# Все тесты
npm test

# С покрытием
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📚 Примеры использования API

### Регистрация
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "Иван",
    "lastName": "Иванов"
  }'
```

### Вход
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Получить товары
```bash
curl http://localhost:3000/api/v1/products
```

### Получить товар по ID
```bash
curl http://localhost:3000/api/v1/products/{id}
```

### Добавить товар в корзину (требуется авторизация)
```bash
curl -X POST http://localhost:3000/api/v1/cart/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": "uuid-товара",
    "quantity": 2
  }'
```

---

## 📖 Документация

### Основные документы:
- **[Техническое задание](./technical-specification.md)** - Полные требования
- **[Итоговый отчёт](./lab7-report.md)** ⭐ - Главный документ (1200+ строк)
- **[Распределение задач](./task-distribution.md)** - План работ
- **[Backend README](./backend/README.md)** - Подробная документация backend
- **[PROJECT-SUMMARY](./PROJECT-SUMMARY.md)** - Краткая сводка

### API документация:
- **Swagger UI:** http://localhost:3000/api/docs
- Интерактивная документация со всеми эндпоинтами
- Примеры запросов и ответов
- Возможность тестирования API прямо в браузере

---

## 🔧 Полезные команды

### Backend разработка:
```bash
cd backend
npm install          # Установить зависимости
npm run dev          # Запустить dev сервер (с hot reload)
npm start            # Запустить production сервер
npm test             # Запустить тесты
npm run lint         # Проверить код (ESLint)
npm run format       # Форматировать код (Prettier)
```

### Docker:
```bash
docker-compose up       # Запустить в foreground
docker-compose up -d    # Запустить в background
docker-compose down     # Остановить все контейнеры
docker-compose logs -f  # Просмотр логов
docker-compose ps       # Статус контейнеров
```

### База данных:
```bash
npm run db:migrate      # Запустить миграции
npm run db:seed         # Наполнить тестовыми данными
npm run db:reset        # Сбросить БД и пересоздать
```

---

## ❓ Troubleshooting

### Порт 3000 уже занят
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### PostgreSQL не подключается
1. Проверьте, что PostgreSQL запущен
2. Проверьте пароль в `.env`
3. Проверьте имя базы данных

### Docker ошибки
```bash
# Пересоздать контейнеры
docker-compose down -v
docker-compose up --build

# Очистить кэш
docker system prune -a
```

### npm install ошибки
```bash
# Очистить кэш npm
npm cache clean --force

# Удалить node_modules и переустановить
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Следующие шаги

После успешного запуска:

1. ✅ Проверьте health endpoint: `/health`
2. ✅ Откройте Swagger UI: `/api/docs`
3. ✅ Попробуйте зарегистрироваться: `POST /auth/register`
4. ✅ Получите список товаров: `GET /products`
5. ✅ Изучите итоговый отчёт: `lab7-report.md`

---

## 📞 Поддержка

**Команда:** korochki  
**Группа:** 11а-3  
**Проект:** ТехноМарт

При возникновении вопросов:
1. Проверьте документацию: `lab7-report.md`
2. Изучите примеры: Swagger UI
3. Проверьте логи: `docker-compose logs -f`

---

**Дата создания:** 30 октября 2025  
**Статус:** ✅ Готово к использованию

