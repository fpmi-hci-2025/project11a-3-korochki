# 🚀 Инструкция по деплою ТехноМарт

## Архитектура

| Компонент | Платформа | URL |
|-----------|-----------|-----|
| Frontend | Vercel | `https://technomart.vercel.app` |
| Backend | Render.com | `https://technomart-api.onrender.com` |

> **Почему не всё на Vercel?**  
> Vercel оптимизирован для статики и serverless. Наш бэкенд использует SQLite с persistent storage, что лучше работает на Render.com.

---

## Шаг 1: Подготовка репозитория

Убедись, что весь код запушен в GitHub:

```bash
cd d:\4course\pchmi\project11a-3-korochki
git add .
git commit -m "Prepare for deployment"
git push origin main
```

---

## Шаг 2: Деплой Backend на Render.com

### 2.1 Регистрация
1. Перейди на [render.com](https://render.com)
2. Нажми **Get Started for Free**
3. Войди через GitHub

### 2.2 Создание Web Service
1. На Dashboard нажми **New +** → **Web Service**
2. Выбери **Build and deploy from a Git repository** → **Next**
3. Подключи репозиторий `project11a-3-korochki`
4. Заполни настройки:

| Поле | Значение |
|------|----------|
| **Name** | `technomart-api` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` |
| **Root Directory** | `lab9/backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 2.3 Environment Variables
Нажми **Advanced** и добавь переменные:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `technomart-secret-key-2024` (или свой) |
| `PORT` | `3000` |

### 2.4 Persistent Disk (для SQLite)
В разделе **Disks** нажми **Add Disk**:

| Поле | Значение |
|------|----------|
| **Name** | `data` |
| **Mount Path** | `/opt/render/project/src/data` |
| **Size** | `1 GB` |

### 2.5 Deploy
Нажми **Create Web Service**

⏳ Подожди 3-5 минут пока соберётся.

📝 Запиши URL бэкенда: `https://technomart-api.onrender.com`

---

## Шаг 3: Деплой Frontend на Vercel

### 3.1 Регистрация
1. Перейди на [vercel.com](https://vercel.com)
2. Нажми **Start Deploying**
3. Войди через GitHub

### 3.2 Import Project
1. Нажми **Add New...** → **Project**
2. Выбери репозиторий `project11a-3-korochki`
3. Нажми **Import**

### 3.3 Configure Project
Заполни настройки:

| Поле | Значение |
|------|----------|
| **Project Name** | `technomart` |
| **Framework Preset** | `Vite` |
| **Root Directory** | `lab9/frontend` |

### 3.4 Environment Variables
Нажми **Environment Variables** и добавь:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://technomart-api.onrender.com/api` |

⚠️ **Важно:** Замени `technomart-api` на реальное имя твоего Render сервиса!

### 3.5 Deploy
Нажми **Deploy**

⏳ Подожди 1-2 минуты.

🎉 Готово! Твой сайт доступен по адресу `https://technomart.vercel.app`

---

## Шаг 4: Проверка

### Тестовые аккаунты
| Роль | Email | Пароль |
|------|-------|--------|
| Админ | `admin@technomart.by` | `admin123` |
| Курьер | `courier@technomart.by` | `courier123` |

### Чек-лист
- [ ] Открыть главную страницу
- [ ] Зарегистрировать нового пользователя
- [ ] Добавить товар в корзину
- [ ] Оформить заказ
- [ ] Войти как админ и проверить панель
- [ ] Войти как курьер и принять заказ

---

## Troubleshooting

### Backend не запускается
Проверь логи в Render Dashboard → Logs

### CORS ошибки
Убедись что в бэкенде разрешён домен Vercel:
```javascript
// backend/src/index.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://technomart.vercel.app'],
  credentials: true
}))
```

### База данных пустая
SSH в Render и запусти:
```bash
npm run seed
```

### Free tier "спит"
На бесплатном тарифе Render сервис засыпает после 15 минут неактивности. Первый запрос после сна занимает ~30 секунд.

---

## Полезные ссылки

- [Render.com Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Repository](https://github.com/your-username/project11a-3-korochki)

---

## Структура проекта для деплоя

```
lab9/
├── backend/           # → Render.com
│   ├── src/
│   ├── data/         # SQLite database
│   ├── package.json
│   └── render.yaml   # Render blueprint
│
└── frontend/         # → Vercel
    ├── src/
    ├── public/
    ├── package.json
    └── vercel.json   # Vercel config
```

