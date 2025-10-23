# Структура Wiki проекта "ТехноМарт"

## Главная страница

### Краткое описание проекта
Онлайн-магазин цифровой техники "ТехноМарт" - современная платформа для продажи смартфонов, ноутбуков, планшетов, аксессуаров и комплектующих. Проект включает веб-приложение и мобильное приложение с фокусом на удобство пользователя и качественный сервис.

### Навигация по разделам
- [Функциональные требования](#функциональные-требования)
- [Диаграммы UML](#диаграммы-uml)
- [Event Storming](#event-storming)
- [Event Modeling](#event-modeling)
- [Архитектура C4 Model](#архитектура-c4-model)
- [Дополнительная спецификация](#дополнительная-спецификация)
- [Схема базы данных](#схема-базы-данных)
- [API проекта](#api-проекта)
- [Визуальный дизайн и прототип](#визуальный-дизайн-и-прототип)
- [Презентация проекта](#презентация-проекта)

---

## Диаграммы UML

### Use Case диаграммы и сценарии
- **Файл**: [use-case-diagram.puml](lab3/diagrams/use-case-diagram.puml)
- **Сценарии**: [use-case-scenarios.md](lab3/use-case-scenarios.md)

Диаграмма вариантов использования показывает взаимодействие различных актеров (гость, покупатель, администратор, менеджер, курьер) с системой ТехноМарт.

### Диаграммы деятельности
- **Процесс оформления заказа**: [activity-order-processing.puml](lab3/diagrams/activity-order-processing.puml)
- **Поиск и выбор товара**: [activity-product-search.puml](lab3/diagrams/activity-product-search.puml)

### Диаграммы классов
- **Основные сущности**: [class-diagram-core.puml](lab3/diagrams/class-diagram-core.puml)
- **Заказы и корзина**: [class-diagram-order.puml](lab3/diagrams/class-diagram-order.puml)
- **Отзывы и рейтинги**: [class-diagram-review.puml](lab3/diagrams/class-diagram-review.puml)
- **Сервисные классы**: [class-diagram-services.puml](lab3/diagrams/class-diagram-services.puml)

### Диаграммы последовательности
- **Регистрация пользователя**: [sequence-user-registration.puml](lab3/diagrams/sequence-user-registration.puml)
- **Поиск товаров**: [sequence-product-search.puml](lab3/diagrams/sequence-product-search.puml)
- **Создание заказа**: [sequence-order-creation.puml](lab3/diagrams/sequence-order-creation.puml)
- **Отправка отзыва**: [sequence-review-submission.puml](lab3/diagrams/sequence-review-submission.puml)
- **Управление товарами**: [sequence-admin-product-management.puml](lab3/diagrams/sequence-admin-product-management.puml)

### Диаграммы компонентов и пакетов
- **Компоненты системы**: [component-diagram.puml](lab3/diagrams/component-diagram.puml)
- **Структура пакетов**: [package-diagram.puml](lab3/diagrams/package-diagram.puml)

### Диаграмма развертывания
- **Инфраструктура**: [deployment-diagram.puml](lab3/diagrams/deployment-diagram.puml)

### Схема базы данных (ERD)
- **Файл**: [erd-database.puml](lab3/diagrams/erd-database.puml)

---

## Event Storming

Event Storming - метод исследования предметной области через моделирование событий, команд и бизнес-процессов.

### Крупномасштабное исследование (Big Picture)
- **Файл**: [event-storming-big-picture.puml](lab3/diagrams/event-storming-big-picture.puml)

Показывает общий поток событий в системе ТехноМарт от регистрации пользователя до доставки заказа.

### Моделирование процессов
- **Файл**: [event-storming-process-modeling.puml](lab3/diagrams/event-storming-process-modeling.puml)

Детализирует бизнес-процессы через агрегаты, команды и события с выделением автоматизированных правил.

---

## Event Modeling

Event Modeling - техника проектирования систем с использованием шаблонов Given/When/Then.

### Поток оформления заказа
- **Файл**: [event-modeling-order-flow.puml](lab3/diagrams/event-modeling-order-flow.puml)

Моделирует процесс создания заказа от триггера до завершающих событий.

### Управление товарами
- **Файл**: [event-modeling-product-management.puml](lab3/diagrams/event-modeling-product-management.puml)

Показывает потоки добавления товаров, поиска и обновления каталога.

---

## Архитектура C4 Model

C4 Model - подход к документированию архитектуры через контекст, контейнеры, компоненты и код.

### Контекстная диаграмма (Level 1)
- **Файл**: [c4-context-diagram.puml](lab3/diagrams/c4-context-diagram.puml)

Показывает систему ТехноМарт в контексте пользователей и внешних систем.

### Диаграмма контейнеров (Level 2)
- **Файл**: [c4-container-diagram.puml](lab3/diagrams/c4-container-diagram.puml)

Детализирует архитектуру на уровне приложений, сервисов и баз данных.

### Диаграмма компонентов (Level 3)
- **Файл**: [c4-component-diagram.puml](lab3/diagrams/c4-component-diagram.puml)

Показывает внутреннюю структуру Product Service на уровне компонентов.

---

## Функциональные требования

### Use Case диаграммы

#### Актёры системы:
- **Гость** - незарегистрированный пользователь
- **Покупатель** - зарегистрированный пользователь
- **Администратор** - управляет системой
- **Менеджер** - обрабатывает заказы и консультирует

#### Основные сценарии использования:

**Для гостя:**
- Просмотр каталога товаров
- Поиск товаров
- Просмотр карточки товара
- Сравнение товаров
- Чтение отзывов
- Регистрация в системе

**Для покупателя:**
- Все функции гостя +
- Добавление товаров в корзину
- Оформление заказа
- Управление профилем
- Просмотр истории заказов
- Отслеживание заказов
- Написание отзывов
- Управление списком желаний

**Для администратора:**
- Управление каталогом товаров
- Управление пользователями
- Обработка заказов
- Модерация отзывов
- Настройка системы
- Просмотр аналитики

**Для менеджера:**
- Консультирование клиентов
- Обработка заказов
- Работа с возвратами
- Управление акциями

### Текстовые сценарии

#### Сценарий: "Покупка товара"
**Основной поток:**
1. Пользователь ищет товар через поиск или каталог
2. Просматривает карточку товара
3. Добавляет товар в корзину
4. Переходит к оформлению заказа
5. Указывает данные доставки
6. Выбирает способ оплаты
7. Подтверждает заказ
8. Получает подтверждение заказа

**Альтернативные потоки:**
- Пользователь не зарегистрирован → регистрация/вход
- Товара нет в наличии → уведомление о поступлении
- Ошибка оплаты → повторная попытка или смена способа



---

## Дополнительная спецификация

### Требования к производительности
- **Время отклика**: < 2 секунд для основных операций
- **Пропускная способность**: 1000+ одновременных пользователей
- **Доступность**: 99.9% uptime
- **Масштабируемость**: горизонтальное масштабирование

### Требования к безопасности
- **Аутентификация**: JWT токены
- **Авторизация**: ролевая модель доступа
- **Шифрование**: HTTPS для всех соединений
- **Защита данных**: соответствие GDPR и 152-ФЗ
- **Аудит**: логирование всех критических операций

### Требования к надёжности
- **Резервное копирование**: ежедневные бэкапы
- **Мониторинг**: отслеживание метрик в реальном времени
- **Обработка ошибок**: graceful degradation
- **Восстановление**: RTO < 4 часа, RPO < 1 час

### Требования к совместимости
- **Браузеры**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Мобильные ОС**: iOS 13+, Android 8+
- **Экраны**: адаптивный дизайн для 320px - 2560px

---

## Визуальный дизайн и прототип

### Исследование визуального языка
- **Файл**: [visual-language-research.md](lab5/visual-language-research.md)
- **Краткое резюме**: [LAB5-SUMMARY.md](lab5/LAB5-SUMMARY.md)

#### Визуальный профиль (15 пар прилагательных)

Определен характер интерфейса через оценку по 7-балльной шкале:

**Топ-5 характеристик:**
1. **Современный** (6/7) - технологичный дизайн с актуальными трендами
2. **Технологичный** (6/7) - акцент на инновации и цифровые решения
3. **Профессиональный** (6/7) - высокий уровень проработки деталей
4. **Структурированный** (6/7) - четкая сеточная система
5. **Доверительный** (6/7) - прозрачность информации и безопасность

#### Цветовые схемы

**Основная схема "Tech Blue" (выбрана):**
```
Primary:   #2E5BFF  (Синий - брендинг, надежность)
Success:   #10B981  (Зеленый - действия, успех)
Warning:   #F59E0B  (Оранжевый - скидки, акции)
Error:     #EF4444  (Красный - ошибки)
Neutral:   #F8FAFC → #0F172A (10 оттенков серого)
```

**Альтернативные схемы:**
- "Dark Mode Professional" - для темной темы
- "Warm Accent" - для специальных акций

#### Варианты дизайн-макетов

**Вариант 1: "Minimal Tech" (выбран)**
- Чистые линии и большие отступы
- Карточная система для товаров
- Акцент на изображениях высокого качества
- Модульная сетка 12 колонок
- Фиксированный header с sticky navigation

**Вариант 2: "Dense Information"**
- Плотное расположение элементов
- Sidebar с фильтрами
- 5 товаров в ряду на больших экранах

**Вариант 3: "Image-First"**
- Крупные изображения товаров
- Masonry grid layout
- Параллакс эффекты

### Адаптивные макеты
- **Файл**: [responsive-layouts.md](lab5/responsive-layouts.md)

#### Grid System (модульная сетка)

Разработана система сеток для 6 целевых разрешений:

| Разрешение | Колонок | Ширина колонки | Gutter | Padding |
|------------|---------|----------------|--------|---------|
| Desktop XL (1440px+) | 12 | ~93px | 24px | 32px |
| Desktop L (992-1199px) | 12 | ~84px | 24px | 24px |
| Tablet Landscape (768-991px) | 8 | ~96px | 24px | 24px |
| Tablet Portrait (576-767px) | 4 | ~162px | 16px | 24px |
| Mobile L (400-575px) | 4 (flex) | - | 12px | 16px |
| Mobile M (320-399px) | 4 (flex) | - | 12px | 16px |

#### Адаптация ключевых страниц

**Главная страница:**
- Desktop: Hero 400px, 4 товара в ряду
- Tablet: Hero 320px, 2 товара в ряду
- Mobile: Hero 240px, 1 товар в столбец

**Страница каталога:**
- Desktop: Sidebar (3 кол) + Content (9 кол)
- Tablet: Фильтры в drawer, 2 товара в ряду
- Mobile: Bottom sheet, 1 товар в столбец

**Страница товара:**
- Desktop: Галерея (6 кол) + Инфо (6 кол)
- Mobile: Вертикальный стек

### Руководство по стилям (Style Guide)
- **Файл**: [style-guide.md](lab5/style-guide.md)

Полное руководство по визуальному языку системы.

#### Цветовая палитра

**Primary Colors (Основные):**
- Primary Blue: `#2E5BFF`, Dark: `#1E3A8A`, Light: `#60A5FA`

**Accent Colors (Акцентные):**
- Success Green: `#10B981` → CTA кнопки, статус "В наличии"
- Warning Orange: `#F59E0B` → Бейджи скидок, предупреждения
- Error Red: `#EF4444` → Ошибки, критические уведомления
- Info Blue: `#3B82F6` → Информационные блоки

**Neutral Colors (Нейтральные):**
- 10 оттенков серого от `#F8FAFC` до `#0F172A`

#### Типографика

**Шрифтовые семейства:**
```
Основной:      Inter (Variable Font)
Моноширинный:  JetBrains Mono
```

**Размеры заголовков:**
```
H1:  48px (desktop) / 32px (mobile)  | Bold (700)
H2:  36px / 28px  | Bold (700)
H3:  30px / 24px  | Semi-Bold (600)
H4:  24px / 20px  | Semi-Bold (600)
```

**Размеры текста:**
```
Large:   18px  | Regular (400)
Base:    16px (desktop) / 14px (mobile)  | Regular (400)
Small:   14px / 12px  | Regular (400)
XSmall:  12px  | Regular (400)
```

**Веса шрифтов:**
- Light (300), Regular (400), Medium (500)
- Semi-Bold (600), Bold (700), Extra-Bold (800)

#### Spacing System

Система отступов на основе **8px базового unit**:
```
0px, 4px, 8px, 12px, 16px, 20px, 24px, 
32px, 40px, 48px, 64px, 80px, 96px
```

**Применение:**
- Padding элементов: 16px, 24px, 32px
- Margin между секциями: 48px, 64px, 96px
- Gap в Grid: 24px (desktop), 12px (mobile)

#### UI Компоненты

**Кнопки (3 типа):**

*Primary Button:*
```
Background:  #10B981 (Success Green)
Height:      40px (medium)
Padding:     12px 24px
Border-radius: 8px
Font-weight: 600

Hover:  #059669, transform, shadow
```

*Secondary Button:*
```
Background:  transparent
Border:      2px solid #2E5BFF
Padding:     10px 22px

Hover:  Background #EFF6FF
```

*Ghost Button:*
```
Background:  transparent
Text:        #64748B

Hover:  Background #F1F5F9
```

**Input Fields:**

*Text Input:*
```
Height:      40px
Padding:     10px 16px
Border:      1px solid #CBD5E1
Border-radius: 8px

Focus:   Border #2E5BFF + shadow
Error:   Border #EF4444 + shadow
```

**Cards:**

*Product Card:*
```
Background:   #FFFFFF
Border:       1px solid #E2E8F0
Border-radius: 12px
Padding:      16px
Shadow:       0 1px 3px rgba(0,0,0,0.1)

Hover:  translateY(-4px) + elevation shadow

Structure:
  - Image (aspect-ratio 1:1)
  - Title (2 lines max, ellipsis)
  - Rating (stars + count)
  - Price (bold, large)
  - Old Price (crossed)
  - CTA Button (full-width)
```

**Badges:**

*Discount Badge:*
```
Background:   #F59E0B
Text:         #FFFFFF
Padding:      4px 8px
Border-radius: 4px
Font-size:    12px
Font-weight:  700
Position:     absolute top-left
```

*Status Badge:*
```
4 варианта: success/warning/error/info
Semitransparent backgrounds
Padding:      6px 12px
Border-radius: 6px
```

*Count Badge:*
```
Background:   #EF4444
Size:         20px × 20px (circle)
Position:     absolute top-right
```

**Navigation:**

*Header:*
```
Height:      72px (desktop), 64px (mobile)
Background:  #2E5BFF
Position:    sticky top
Shadow:      elevation 1

Content:  Logo + Search + Nav + Icons
```

*Mobile Menu:*
```
Width:       280px
Animation:   slide-in from right
Type:        Burger menu
```

**Footer:**
```
Background:  #1E293B
Text:        #CBD5E1
Padding:     48px 0 24px

Layout:  4 columns (desktop) → Accordion (mobile)
```

#### Эффекты и анимации

**Transitions:**
```css
Default:  0.3s ease  (hover эффекты)
Quick:    0.15s ease (кнопки)
Slow:     0.5s ease  (smooth scroll)
```

**Shadows (4 уровня elevation):**
```css
Elevation 1:  0 1px 3px rgba(0,0,0,0.1)    /* Cards */
Elevation 2:  0 4px 12px rgba(0,0,0,0.15)  /* Hover */
Elevation 3:  0 8px 24px rgba(0,0,0,0.2)   /* Dropdowns */
Elevation 4:  0 16px 48px rgba(0,0,0,0.3)  /* Modals */
```

**Border Radius:**
```css
Small:   4px   (badges)
Medium:  8px   (buttons, inputs)
Large:   12px  (cards)
XLarge:  16px  (images)
Circle:  50%   (avatars)
```

#### Accessibility (WCAG 2.1 AA)

**Контрастность:**
- Основной текст (< 18px): минимум **4.5:1**
- Крупный текст (≥ 18px): минимум **3:1**
- UI элементы: минимум **3:1**

**Focus States:**
```css
:focus-visible {
  outline: 2px solid #2E5BFF;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(46, 91, 255, 0.3);
}
```

**Alternative Text:**
- Все изображения: атрибут `alt`
- Иконки с функцией: `aria-label`
- Декоративные: `alt=""`

### Иконки

**Семейство:** Heroicons / Lucide Icons  
**Стиль:** Outline (основной), Solid (акценты)

**Размеры:**
```
Small:   16px × 16px
Medium:  24px × 24px  (по умолчанию)
Large:   32px × 32px
XLarge:  48px × 48px
```

**Основные иконки:**
- 🔍 Search, 🛒 Cart, 👤 User, ♡ Heart
- ☰ Menu, ⚙️ Settings, 📦 Package
- ⭐ Star (рейтинг), ✓ Check, ✕ Close

### Отчет по дизайну
- **Полный отчет**: [lab5-report.md](lab5/lab5-report.md)
- **README**: [README.md](lab5/README.md)

Отчет включает:
- Цели и задачи работы
- Детальное описание всех заданий
- Обоснование принятых решений
- Анализ результатов
- Список использованных источников (20 источников)

### Ключевые принципы дизайна

1. **Mobile-First** - начинаем с 320px, масштабируем до 1440px+
2. **Card-Based Design** - модульная система карточек
3. **Minimalism** - чистый интерфейс без визуального шума
4. **Consistency** - единообразие через Style Guide
5. **Performance** - оптимизация загрузки и отклика
6. **Accessibility First** - WCAG 2.1 AA с первого дня
