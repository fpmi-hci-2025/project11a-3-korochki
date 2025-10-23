# Проект "ТехноМарт" - Общий обзор

**Тип проекта:** Интернет-магазин электроники
**Команда:** korochki
**Группа:** 11а-3
**Дисциплина:** Проектирование человеко-машинного интерфейса
**Год:** 2025

---

## 📋 Описание проекта

**ТехноМарт** - современная платформа электронной коммерции для продажи цифровой техники и электроники. Проект включает веб-приложение и мобильное приложение с фокусом на удобство пользователя, высокую производительность и масштабируемость.

### Основные направления деятельности:

- 📱 Смартфоны и планшеты
- 💻 Ноутбуки и компьютеры
- 🎧 Аксессуары и периферия
- 🔧 Комплектующие для ПК

### Целевая аудитория:

- **B2C**: частные покупатели (18-55 лет)
- **B2B**: бизнес-клиенты и корпоративные закупки
- **Энтузиасты**: технологически продвинутые пользователи

---

## 🎯 Статус проекта

| Этап | Лабораторная                                      | Статус          | Документация |
| -------- | ------------------------------------------------------------- | --------------------- | ------------------------ |
| 1        | Lab 2: Дизайн интерфейса                      | ✅ Завершено | `/lab2`                |
| 2        | Lab 3: Требования и UML                            | ✅ Завершено | `/lab3`                |
| 3        | Lab 4: Моделирование требований и API | ✅ Завершено | `/lab4`                |
| 4        | Lab 5: Прототип и дизайн                       | ✅ Завершено | `/lab5`                |

**Общий прогресс:** 4/4 лабораторных работ выполнено

---

## 📁 Структура проекта

```
project11a-3-korochki/
├── lab2/                    # Lab 2: Дизайн интерфейса
│   ├── journey-maps/        # Journey Maps
│   ├── interaction-design/  # Interaction Design
│   └── lab2-report.md       # Отчет
│
├── lab3/                    # Lab 3: Требования и UML
│   ├── diagrams/            # UML диаграммы
│   │   ├── use-case-*.puml
│   │   ├── class-*.puml
│   │   ├── sequence-*.puml
│   │   ├── event-*.puml
│   │   └── c4-*.puml
│   ├── use-case-scenarios.md
│   └── lab3-report.md
│
├── lab4/                    # Lab 4: Моделирование и API
│   ├── diagrams/
│   │   ├── logical-database-model.puml
│   │   └── physical-database-model.puml
│   ├── requirements-model.md      # Actor → User Story → Use Case
│   ├── use-case-registry.md       # Реестр Use Cases
│   ├── database-schema.sql        # DDL скрипт PostgreSQL
│   ├── api-routes-endpoints.md    # REST API спецификация
│   ├── openapi-specification.yaml # OpenAPI 3.0
│   ├── api-examples.md            # Примеры запросов
│   └── lab4-report.md
│
├── lab5/                    # Lab 5: Прототип и дизайн
│   ├── visual-language-research.md  # Исследование визуального языка
│   ├── responsive-layouts.md        # Адаптивные макеты
│   ├── style-guide.md               # Руководство по стилям
│   ├── lab5-report.md               # Полный отчет
│   ├── README.md                    # Навигация
│   └── LAB5-SUMMARY.md              # Краткое резюме
│
├── wiki-structure.md        # Структура Wiki проекта
└── PROJECT-OVERVIEW.md      # Этот файл
```

---

## 🔍 Обзор лабораторных работ

### Lab 2: Дизайн интерфейса ✅

**Цель:** Исследование пользовательского опыта и проектирование взаимодействия

**Ключевые результаты:**

- 🗺️ **Journey Maps** для 3 персон (покупатель, администратор, менеджер)
- 🎨 **Interaction Design** документация
- 📊 **Optimal Sorting** результаты
- 📱 **Wireframes** основных экранов

**Документация:** `lab2/lab2-report.md`

---

### Lab 3: Требования и UML диаграммы ✅

**Цель:** Разработка системных требований и моделирование архитектуры

**Ключевые результаты:**

#### UML Диаграммы (20+ диаграмм):

- **Use Case диаграммы** + детальные сценарии
- **Class Diagrams** (4 диаграммы: core, order, review, services)
- **Sequence Diagrams** (5 диаграмм)
- **Activity Diagrams** (2 диаграммы)
- **Component & Package Diagrams**
- **Deployment Diagram**
- **ERD** (Entity-Relationship Diagram)

#### Event Storming:

- Big Picture исследование
- Process Modeling с агрегатами

#### Event Modeling:

- Order Flow
- Product Management

#### C4 Model:

- Context Diagram (Level 1)
- Container Diagram (Level 2)
- Component Diagram (Level 3)

**Документация:** `lab3/lab3-report.md`

---

### Lab 4: Моделирование требований и API ✅

**Цель:** Детальная спецификация требований, БД и API

**Ключевые результаты:**

#### Моделирование требований:

- **5 акторов** системы
- **21 User Story** с acceptance criteria
- **24 Use Cases** с детальными потоками
- **MoSCoW приоритизация**
- **Non-functional requirements**

#### Базы данных:

- **Logical Database Model** (PlantUML)
- **Physical Database Model** для PostgreSQL
- **DDL скрипт** (18 таблиц, 40+ индексов, 12 триггеров)

#### API Design:

- **70+ REST endpoints** в 8 модулях
- **OpenAPI 3.0 спецификация** (1350+ строк)
- **15+ reusable schemas**
- **15+ примеров запросов** с cURL

**Статистика:**

- Таблиц БД: 18
- Endpoints: 70+
- Use Cases: 24
- User Stories: 21

**Документация:** `lab4/lab4-report.md`

---

### Lab 5: Прототип и визуальный дизайн ✅

**Цель:** Проектирование интерактивного прототипа и Style Guide

**Ключевые результаты:**

#### Исследование визуального языка:

- **15 пар прилагательных** для оценки дизайна
- **3 цветовые схемы** (выбрана "Tech Blue")
- **3 варианта макетов** (выбран "Minimal Tech")
- **Визуальный профиль**: Современный (6), Технологичный (6), Профессиональный (6)

#### Адаптивные макеты:

- **Grid System** для 6 разрешений:
  - Desktop XL (1440px+): 12 колонок
  - Desktop L (992-1199px): 12 колонок
  - Tablet Landscape (768-991px): 8 колонок
  - Tablet Portrait (576-767px): 4 колонки
  - Mobile L (400-575px): 4 колонки
  - Mobile M (320-399px): 4 колонки
- Адаптация главной страницы, каталога, страницы товара

#### Style Guide:

- **Цветовая палитра**: 20+ цветов в 4 группах
- **Типографика**: Inter + JetBrains Mono, 10 размеров
- **Spacing**: система 8px (4-96px)
- **15+ UI компонентов** с состояниями
- **Accessibility**: WCAG 2.1 AA

**Статистика:**

- Документов: 5
- Страниц: ~60
- Цветов: 20+
- Компонентов: 15+
- Разрешений: 6

**Документация:** `lab5/lab5-report.md`, `lab5/LAB5-SUMMARY.md`

---

## 🎨 Дизайн-система

### Цветовая палитра "Tech Blue"

```
Primary:   #2E5BFF  (Синий - брендинг, надежность)
Success:   #10B981  (Зеленый - действия, успех)
Warning:   #F59E0B  (Оранжевый - скидки, акции)
Error:     #EF4444  (Красный - ошибки)
Neutral:   #F8FAFC → #0F172A (10 оттенков серого)
```

### Типографика

```
Основной шрифт:  Inter (Variable Font)
Моноширинный:    JetBrains Mono

H1:  48px (desktop) / 32px (mobile)
H2:  36px / 28px
Base: 16px / 14px
```

### UI Компоненты

- Кнопки: Primary / Secondary / Ghost
- Карточки: Product / Info
- Badges: Discount / Status / Count
- Inputs: Text / Search
- Navigation: Header / Footer / Mobile Menu

---

## 🏗️ Архитектура системы

### Технологический стек (рекомендуемый)

**Frontend:**

- React 18 + TypeScript
- Tailwind CSS (следуя Style Guide)
- React Query для state management
- React Router для навигации

**Backend:**

- Node.js + Express / NestJS
- PostgreSQL 15+ (согласно schema)
- Redis для кэширования
- JWT для аутентификации

**Infrastructure:**

- Docker + Docker Compose
- Nginx как reverse proxy
- CI/CD: GitHub Actions
- Hosting: AWS / Azure / Vercel

### Структура базы данных

**18 основных таблиц:**

- users, user_profiles, user_addresses
- categories, products, product_images, product_specifications
- carts, cart_items
- orders, order_items, deliveries
- reviews, review_images
- wishlists, wishlist_items
- payments
- notifications
- audit_logs

**40+ индексов** для оптимизации
**12 триггеров** для автоматизации
**2 представления** для аналитики
**RLS политики** для безопасности

### REST API

**8 основных модулей:**

1. Auth (7 endpoints)
2. Users (10 endpoints)
3. Products (15 endpoints)
4. Categories (6 endpoints)
5. Cart (6 endpoints)
6. Orders (10 endpoints)
7. Reviews (8 endpoints)
8. Admin (8+ endpoints)

**Итого:** 70+ endpoints

---

## 👥 Функциональность по ролям

### 🔓 Гость

- Просмотр каталога и товаров
- Поиск и фильтрация
- Чтение отзывов
- Сравнение товаров
- Регистрация/вход

### 👤 Покупатель

- Все функции гостя +
- Управление корзиной
- Оформление заказов
- Отслеживание доставки
- Написание отзывов
- Список желаний
- История покупок

### 👔 Администратор

- Управление каталогом
- Управление пользователями
- Обработка заказов
- Модерация отзывов
- Аналитика и отчеты
- Настройка системы

### 📞 Менеджер

- Консультирование клиентов
- Обработка заказов
- Управление акциями
- Работа с возвратами

---

## 📊 Ключевые метрики и цели

### UX Метрики (целевые)

- **Task Success Rate:** > 95%
- **Time on Task:** < среднего по отрасли
- **Error Rate:** < 5%
- **Satisfaction Score (SUS):** > 80

### Performance метрики

- **First Contentful Paint:** < 1.8s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.8s
- **Cumulative Layout Shift:** < 0.1

### Бизнес-метрики (прогноз)

- **Conversion Rate:** 2-5%
- **Average Order Value:** 50,000-100,000 ₽
- **Cart Abandonment:** < 70%
- **Return Customer Rate:** > 30%

### Accessibility

- **WCAG 2.1 Level:** AA (100% соответствие)
- **Контраст текста:** минимум 4.5:1
- **Keyboard Navigation:** полная поддержка
- **Screen Reader:** оптимизировано

---

## 🎯 Принципы разработки

### 1. Mobile-First

Начинаем проектирование с мобильной версии (320px), затем масштабируем до desktop (1440px+)

### 2. Card-Based Design

Модульная система карточек для гибкости и переиспользования

### 3. Minimalism

Чистый интерфейс без визуального шума, фокус на контенте

### 4. Consistency

Единообразие всех элементов через Style Guide

### 5. Performance First

Оптимизация загрузки, lazy loading, code splitting

### 6. Accessibility First

WCAG 2.1 AA с первого дня разработки

### 7. Security by Design

Безопасность заложена в архитектуру (JWT, HTTPS, RLS, аудит)

### 8. Scalability

Горизонтальное масштабирование, микросервисная архитектура (опционально)

---

## 📈 Статистика проекта

### Документация

- **Лабораторных работ:** 4
- **Документов:** 50+
- **Страниц документации:** 300+
- **UML диаграмм:** 20+

### База данных

- **Таблиц:** 18
- **Индексов:** 40+
- **Триггеров:** 12
- **Представлений:** 2

### API

- **Модулей:** 8
- **Endpoints:** 70+
- **Reusable Schemas:** 15+
- **Примеров:** 15+

### Дизайн

- **Цветов в палитре:** 20+
- **UI компонентов:** 15+
- **Разрешений экрана:** 6
- **Вариантов макетов:** 3

### Требования

- **Акторов:** 5
- **User Stories:** 21
- **Use Cases:** 24
- **NFR:** 15+

---

## 🚀 Roadmap развития

### Фаза 1: MVP (3-4 месяца)

- ✅ Документация и проектирование
- ⏳ Backend API разработка
- ⏳ Frontend разработка (основные экраны)
- ⏳ Интеграция платежей
- ⏳ Базовый деплой

### Фаза 2: Beta (2-3 месяца)

- ⏳ UX-тестирование
- ⏳ Оптимизация производительности
- ⏳ Мобильное приложение (React Native)
- ⏳ Расширенная аналитика
- ⏳ Закрытый beta-запуск

### Фаза 3: Production (1-2 месяца)

- ⏳ Исправление багов из beta
- ⏳ SEO оптимизация
- ⏳ Маркетинговые интеграции
- ⏳ Production деплой
- ⏳ Публичный запуск

### Фаза 4: Growth (постоянно)

- ⏳ A/B тестирование
- ⏳ Новые функции по обратной связи
- ⏳ Персонализация
- ⏳ ML рекомендации
- ⏳ Масштабирование

---

## 📚 Документация по разделам

### Быстрый старт

1. **Общее знакомство:** Этот файл (`PROJECT-OVERVIEW.md`)
2. **Wiki структура:** `wiki-structure.md`
3. **Дизайн-система:** `lab5/style-guide.md`
4. **API:** `lab4/openapi-specification.yaml`
5. **База данных:** `lab4/database-schema.sql`

### По лабораторным

- **Lab 2:** `lab2/lab2-report.md`
- **Lab 3:** `lab3/lab3-report.md`
- **Lab 4:** `lab4/lab4-report.md`
- **Lab 5:** `lab5/lab5-report.md` + `lab5/LAB5-SUMMARY.md`

### Техническая документация

- **Use Cases:** `lab4/use-case-registry.md`
- **User Stories:** `lab4/requirements-model.md`
- **API Routes:** `lab4/api-routes-endpoints.md`
- **API Examples:** `lab4/api-examples.md`
- **DB Schema:** `lab4/database-schema.sql`

### Дизайн документация

- **Visual Language:** `lab5/visual-language-research.md`
- **Responsive Layouts:** `lab5/responsive-layouts.md`
- **Style Guide:** `lab5/style-guide.md`

### UML диаграммы

Все в папке `lab3/diagrams/`:

- `use-case-*.puml`
- `class-*.puml`
- `sequence-*.puml`
- `activity-*.puml`
- `event-*.puml`
- `c4-*.puml`
- `erd-database.puml`

---

## 🛠️ Инструменты и технологии

### Проектирование

- **PlantUML** - UML диаграммы
- **Figma** (рекомендуется) - прототипирование
- **Markdown** - документация

### Разработка (рекомендуется)

- **VS Code** - IDE
- **React 18 + TypeScript** - frontend
- **Node.js + Express/NestJS** - backend
- **PostgreSQL 15+** - БД
- **Tailwind CSS** - стили

### DevOps

- **Docker** - контейнеризация
- **GitHub Actions** - CI/CD
- **Nginx** - reverse proxy
- **AWS/Azure/Vercel** - hosting

### Тестирование

- **Jest** - unit тесты
- **Playwright** - E2E тесты
- **Lighthouse** - performance
- **axe** - accessibility

---

## 📞 Информация о проекте

**Название:** ТехноМарт
**Тип:** Интернет-магазин электроники
**Команда:** korochki
**Группа:** 11а-3
**Учебный год:** 2024-2025
**Дисциплина:** Проектирование человеко-машинного интерфейса

---

## ✅ Чек-лист выполнения

### Документация

- [X] Lab 2: Дизайн интерфейса
- [X] Lab 3: Требования и UML
- [X] Lab 4: Моделирование и API
- [X] Lab 5: Прототип и дизайн
- [X] Wiki структура
- [X] Project Overview

### Диаграммы

- [X] Use Case диаграммы (5+)
- [X] Class Diagrams (4)
- [X] Sequence Diagrams (5)
- [X] Activity Diagrams (2)
- [X] Event Storming (2)
- [X] Event Modeling (2)
- [X] C4 Model (3 уровня)
- [X] ERD
- [X] Deployment Diagram

### Спецификации

- [X] Requirements Model (21 User Stories)
- [X] Use Case Registry (24 Use Cases)
- [X] Database Schema (18 таблиц)
- [X] API Routes (70+ endpoints)
- [X] OpenAPI Specification
- [X] Style Guide

### Дизайн

- [X] Visual Language Research
- [X] Цветовые схемы (3 варианта)
- [X] Варианты макетов (3 варианта)
- [X] Grid System (6 разрешений)
- [X] Responsive Layouts
- [X] UI Components (15+)
- [X] Accessibility (WCAG 2.1 AA)

---

## 🎓 Выводы

Проект "ТехноМарт" представляет собой **полный цикл проектирования** современной e-commerce платформы от исследования UX до детальных технических спецификаций и визуального дизайна.

### Достижения:

✅ Создана полная документация системы (300+ страниц)
✅ Разработано 20+ UML диаграмм всех типов
✅ Спроектирована архитектура БД (18 таблиц)
✅ Специфицировано 70+ REST API endpoints
✅ Разработана дизайн-система с Style Guide
✅ Обеспечена адаптивность для 6 разрешений
✅ Соблюдены стандарты WCAG 2.1 AA

### Готовность к реализации:

Проект полностью готов к началу фазы разработки. Все необходимые спецификации, документация и дизайн-системы созданы и задокументированы.

---

**Статус проекта:** ✅ **READY FOR DEVELOPMENT**

*Последнее обновление: 2024*
