# ТехноМарт - Интернет-магазин электроники

**Команда:** korochki | **Группа:** 11а-3 | **Год:** 2024-2025

---

## 🎯 О проекте

**ТехноМарт** - современная платформа электронной коммерции для продажи цифровой техники и электроники.

Полная документация от UX-исследования до детальных технических спецификаций и визуального дизайна.

---

## 📁 Навигация

### 🚀 Быстрый старт
- **[PROJECT-OVERVIEW.md](PROJECT-OVERVIEW.md)** - полный обзор проекта (рекомендуем начать отсюда)
- **[wiki-structure.md](wiki-structure.md)** - структура Wiki с детальным описанием всех разделов

### 📚 Лабораторные работы

| # | Название | Статус | Документация |
|---|----------|--------|--------------|
| 1-2 | User Research, Дизайн интерфейса | ✅ | [lab1/](lab1/), [lab2/](lab2/) |
| 3 | UML Диаграммы (26 шт) | ✅ | [lab3/](lab3/) |
| 4 | Requirements, Database, API | ✅ | [lab4/](lab4/) |
| 5 | Visual Design, Style Guide | ✅ | [lab5/](lab5/) |
| 6 | Usability Testing (SUS: 78.1) | ✅ | [lab6/](lab6/) |
| 7 | Backend (Node.js + PostgreSQL) | ✅ | [lab7/](lab7/) |
| 8 | Frontend (React + Vite) | ✅ | [lab8/](lab8/) |
| 9 | Integration, Testing, Final Report | ✅ | [lab9/](lab9/) |

**Все 9 лабораторных работ завершены на 100%** ✅

### 🎨 Ключевые документы

**Дизайн:**
- [Style Guide](lab5/style-guide.md) - руководство по визуальному языку
- [Responsive Layouts](lab5/responsive-layouts.md) - адаптивные макеты
- [Visual Language Research](lab5/visual-language-research.md) - исследование визуального языка
- [Lab 5 Summary](lab5/LAB5-SUMMARY.md) - краткое резюме по дизайну

**Техническая спецификация:**
- [API Routes](lab4/api-routes-endpoints.md) - 70+ REST endpoints
- [OpenAPI Specification](lab4/openapi-specification.yaml) - OpenAPI 3.0
- [Database Schema](lab4/database-schema.sql) - PostgreSQL DDL (18 таблиц)
- [Requirements Model](lab4/requirements-model.md) - User Stories и Use Cases

**UML диаграммы:**
- [lab3/diagrams/](lab3/diagrams/) - 20+ UML диаграмм
  - Use Case, Class, Sequence, Activity
  - Event Storming, Event Modeling
  - C4 Model, ERD

---

## 📊 Статистика проекта

| Категория | Количество |
|-----------|------------|
| 📚 Лабораторных работ | 9/9 (100%) |
| 📄 Документация | 10000+ строк |
| 📐 UML диаграмм | 26 |
| 🗄️ Таблиц БД | 9 |
| 🔌 API Endpoints | 24 |
| ⚛️ React Pages | 10 |
| 🧩 React Components | 30+ |
| 🧪 Tests | 217 (87% passed) |
| 👥 Акторов системы | 5 |
| 📝 User Stories | 24 |
| 🎯 Use Cases | 24 |
| 💻 Git Commits | 150+ |

---

## 🎨 Дизайн-система

### Цвета
```
Primary:   #2E5BFF  (Синий)
Success:   #10B981  (Зеленый)
Warning:   #F59E0B  (Оранжевый)
Error:     #EF4444  (Красный)
```

### Типографика
```
Шрифт:  Inter (Variable Font)
H1:     48px / 32px (desktop/mobile)
Base:   16px / 14px
```

### Принципы
- Mobile-First (320px → 1440px+)
- Card-Based Design
- Minimalism
- WCAG 2.1 AA

Подробнее: [Style Guide](lab5/style-guide.md)

---

## 🏗️ Архитектура

### Frontend ✅ (Реализовано)
- **React 18.2** + Vite 5.0
- React Router 6.20
- Context API (State Management)
- Axios (HTTP Client)
- **Deployment:** Vercel
- **URL:** https://technomart.vercel.app

### Backend ✅ (Реализовано)
- **Node.js 18+** + Express.js 4.x
- **PostgreSQL 14+** + Sequelize ORM
- JWT Authentication
- **Deployment:** Render.com
- **URL:** https://technomart-api.onrender.com

### DevOps & CI/CD ✅
- **Docker** + Docker Compose
- **GitHub Actions** (автоматические тесты и деплои)
- **SonarCloud** (All A ratings)
- **Jest** + Supertest (85% coverage)

Подробнее: [lab9/FINAL-REPORT.md](lab9/FINAL-REPORT.md)

---

## 👥 Роли пользователей

- 🔓 **Гость** - просмотр каталога, поиск
- 👤 **Покупатель** - заказы, отзывы, профиль
- 👔 **Администратор** - управление системой
- 📞 **Менеджер** - обработка заказов, консультации

---

## 📈 Прогресс

```
Lab 1-2: ████████████████████ 100% ✅
Lab 3:   ████████████████████ 100% ✅
Lab 4:   ████████████████████ 100% ✅
Lab 5:   ████████████████████ 100% ✅
Lab 6:   ████████████████████ 100% ✅
Lab 7:   ████████████████████ 100% ✅ (Backend deployed)
Lab 8:   ████████████████████ 100% ✅ (Frontend deployed)
Lab 9:   ████████████████████ 100% ✅ (Final Report)

Общий прогресс: ████████████████████ 100%
```

**Статус:** ✅ **COMPLETED & DEPLOYED**

**Production URLs:**
- Frontend: https://technomart.vercel.app
- Backend API: https://technomart-api.onrender.com
- API Docs: https://technomart-api.onrender.com/api/docs

---

## 🔗 Полезные ссылки

### 📊 Финальная документация (Lab 9)
- **[FINAL-REPORT.md](lab9/FINAL-REPORT.md)** - финальный отчёт по всему проекту (1500+ строк)
- **[WEB-TESTING-CHECKLIST.md](lab9/WEB-TESTING-CHECKLIST.md)** - чек-лист тестирования (217 тестов)
- **[project-presentation.html](lab9/project-presentation.html)** - презентация проекта (10 слайдов)
- **[logo-design.html](lab9/logo-design.html)** - логотип и визуальные элементы
- **[PROJECT-SUMMARY.md](PROJECT-SUMMARY.md)** - краткое резюме проекта

### 📚 Отчёты по лабораторным
- [Lab 9 Report](lab9/lab9-report.md) - Integration & Final
- [Lab 8 Report](lab8/lab8-report.md) - Frontend (React)
- [Lab 7 Report](lab7/lab7-report.md) - Backend (Node.js)
- [Lab 6 Report](lab6/lab6-report.md) - Usability Testing
- [Lab 5 Report](lab5/lab5-report.md) - Visual Design
- [Lab 4 Report](lab4/lab4-report.md) - Requirements & API
- [Lab 3 Report](lab3/lab3-report.md) - UML Diagrams

### 🛠️ Технические спецификации
- [OpenAPI YAML](lab4/openapi-specification.yaml) - для Swagger/Postman
- [Database DDL](lab4/database-schema.sql) - для PostgreSQL
- [API Routes](lab4/api-routes-endpoints.md) - 24 REST endpoints
- [Backend README](lab7/README.md) - как запустить Backend
- [Frontend README](lab8/README.md) - как запустить Frontend

### 🎨 Дизайн и UX
- [Style Guide](lab5/style-guide.md) - руководство по визуальному языку
- [Responsive Layouts](lab5/responsive-layouts.md) - адаптивные макеты
- [Usability Testing Results](lab6/usability-testing-results.md) - результаты тестирования
- [Prototype](lab6/prototype/) - кликабельный прототип (HTML/CSS/JS)

---

## 📞 Контакты

**Проект:** ТехноМарт  
**Команда:** korochki  
**Группа:** 11а-3  
**Дисциплина:** Проектирование человеко-машинного интерфейса  
**Учебный год:** 2024-2025

---

*Все документы созданы в рамках учебного проекта по дисциплине "Проектирование человеко-машинного интерфейса"*


