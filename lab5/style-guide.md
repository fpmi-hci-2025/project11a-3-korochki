# Style Guide - ТехноМарт

**Лабораторная работа №5**  
**Задание 3: Разработка руководства по стилям**  
**Проект:** ТехноМарт - Интернет-магазин электроники  
**Версия:** 1.0

---

## 1. Введение

Данное руководство по стилям (Style Guide) определяет визуальный язык и принципы дизайна интернет-магазина ТехноМарт. Документ предназначен для дизайнеров, разработчиков и всех участников команды, работающих над продуктом.

### Цели Style Guide

- Обеспечить единообразие визуального языка
- Ускорить процесс дизайна и разработки
- Упростить поддержку и масштабирование
- Создать согласованный пользовательский опыт

---

## 2. Цветовая палитра

### 2.1. Основные цвета (Primary Colors)

#### Primary Blue (Основной синий)
```
Основной:   #2E5BFF  |  RGB(46, 91, 255)   |  HSL(225, 100%, 59%)
Темный:     #1E3A8A  |  RGB(30, 58, 138)   |  HSL(220, 64%, 33%)
Светлый:    #60A5FA  |  RGB(96, 165, 250)  |  HSL(213, 94%, 68%)
```

**Использование:**
- Логотип, бренд-элементы
- Ссылки, активные состояния
- Основные кнопки навигации
- Иконки системы

**Примеры применения:**
- Header фон: Primary Blue
- Ховер состояния ссылок: Primary Blue Темный
- Focus outline: Primary Blue Светлый

---

### 2.2. Нейтральные цвета (Neutral Colors)

#### Grayscale

```
Gray 50:    #F8FAFC  |  Самый светлый фон
Gray 100:   #F1F5F9  |  Вторичный фон
Gray 200:   #E2E8F0  |  Отключенные элементы
Gray 300:   #CBD5E1  |  Границы, разделители
Gray 400:   #94A3B8  |  Placeholder текст
Gray 500:   #64748B  |  Иконки
Gray 600:   #475569  |  Вторичный текст
Gray 700:   #334155  |  Основной текст (альтернатива)
Gray 800:   #1E293B  |  Заголовки
Gray 900:   #0F172A  |  Основной текст
```

**Использование:**
- Gray 50-100: Фоны страниц и секций
- Gray 300: Границы карточек, инпутов
- Gray 600: Дополнительная информация
- Gray 900: Основной текст

---

### 2.3. Акцентные цвета (Accent Colors)

#### Success Green (Успех/Действие)
```
Основной:   #10B981  |  RGB(16, 185, 129)
Темный:     #059669  |  RGB(5, 150, 105)
Светлый:    #6EE7B7  |  RGB(110, 231, 183)
Фон:        #D1FAE5  |  RGB(209, 250, 229)
```

**Использование:**
- Кнопка "Добавить в корзину"
- Индикатор "В наличии"
- Успешные уведомления
- Статус "Доставлено"

#### Warning Orange (Предупреждение/Скидки)
```
Основной:   #F59E0B  |  RGB(245, 158, 11)
Темный:     #D97706  |  RGB(217, 119, 6)
Светлый:    #FCD34D  |  RGB(252, 211, 77)
Фон:        #FEF3C7  |  RGB(254, 243, 199)
```

**Использование:**
- Бейджи скидок
- Предупреждающие сообщения
- Таймеры акций
- Важные уведомления

#### Error Red (Ошибка)
```
Основной:   #EF4444  |  RGB(239, 68, 68)
Темный:     #DC2626  |  RGB(220, 38, 38)
Светлый:    #FCA5A5  |  RGB(252, 165, 165)
Фон:        #FEE2E2  |  RGB(254, 226, 226)
```

**Использование:**
- Сообщения об ошибках
- Валидация форм
- Критические уведомления
- Статус "Отменен"

#### Info Blue (Информация)
```
Основной:   #3B82F6  |  RGB(59, 130, 246)
Темный:     #2563EB  |  RGB(37, 99, 235)
Светлый:    #93C5FD  |  RGB(147, 197, 253)
Фон:        #DBEAFE  |  RGB(219, 234, 254)
```

**Использование:**
- Информационные блоки
- Подсказки (tooltips)
- Статус "Обрабатывается"

---

### 2.4. Специальные цвета

#### Rating Yellow (Рейтинг)
```
Основной:   #FBBF24  |  RGB(251, 191, 36)
```

**Использование:**
- Звезды рейтинга
- Бейджи "Популярное"

#### Overlay
```
Темный:     rgba(0, 0, 0, 0.5)    |  Для модальных окон
Светлый:    rgba(255, 255, 255, 0.9)  |  Для светлых оверлеев
```

---

## 3. Типографика

### 3.1. Семейство шрифтов

#### Основной шрифт (Sans-serif)
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 
             sans-serif;
```

**Характеристики:**
- Современный геометрический гротеск
- Отличная читаемость на экранах
- Поддержка кириллицы
- Variable font для гибкости

#### Моноширинный (для кода/артикулов)
```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

---

### 3.2. Размеры и веса шрифтов

#### Веса (Font Weights)
```
Light:      300
Regular:    400  (основной текст)
Medium:     500
Semi-Bold:  600  (подзаголовки)
Bold:       700  (заголовки)
Extra-Bold: 800  (выделения)
```

#### Размеры (Font Sizes)

**Заголовки:**
```
h1:  48px / 3rem    | Line-height: 1.2  | Weight: 700
h2:  36px / 2.25rem | Line-height: 1.3  | Weight: 700
h3:  30px / 1.875rem| Line-height: 1.3  | Weight: 600
h4:  24px / 1.5rem  | Line-height: 1.4  | Weight: 600
h5:  20px / 1.25rem | Line-height: 1.4  | Weight: 600
h6:  18px / 1.125rem| Line-height: 1.4  | Weight: 600
```

**Текст:**
```
Large:    18px / 1.125rem | Line-height: 1.6  | Weight: 400
Base:     16px / 1rem     | Line-height: 1.5  | Weight: 400
Small:    14px / 0.875rem | Line-height: 1.5  | Weight: 400
XSmall:   12px / 0.75rem  | Line-height: 1.4  | Weight: 400
```

**Примеры использования:**
- h1: Название товара на странице товара
- h2: Заголовки секций на главной
- h3: Названия категорий
- Base: Основной текст описаний
- Small: Дополнительная информация
- XSmall: Labels, badges

---

### 3.3. Адаптивная типографика

**Desktop (1440px+):**
```
h1: 48px
h2: 36px
Base: 16px
```

**Tablet (768-1439px):**
```
h1: 40px
h2: 32px
Base: 16px
```

**Mobile (320-767px):**
```
h1: 32px
h2: 28px
Base: 14px
```

---

## 4. Spacing (Отступы)

### 4.1. Система отступов (8px base)

```
0:     0px
1:     4px    (0.25rem)
2:     8px    (0.5rem)   | Базовый unit
3:     12px   (0.75rem)
4:     16px   (1rem)
5:     20px   (1.25rem)
6:     24px   (1.5rem)
8:     32px   (2rem)
10:    40px   (2.5rem)
12:    48px   (3rem)
16:    64px   (4rem)
20:    80px   (5rem)
24:    96px   (6rem)
```

**Применение:**
- Padding элементов: 4, 6, 8
- Margin между секциями: 12, 16, 20
- Gap в Grid: 6, 8
- Вертикальные ритмы: кратно 8px

---

### 4.2. Размеры компонентов

#### Высота кнопок и инпутов
```
Small:   32px  (py-2)
Medium:  40px  (py-3)  | По умолчанию
Large:   48px  (py-4)
XLarge:  56px  (py-5)
```

#### Ширина контейнеров
```
Mobile:   100% - 32px padding
Tablet:   720px
Desktop:  1140px
XL:       1376px (1440px - 64px padding)
```

---

## 5. Компоненты UI

### 5.1. Кнопки (Buttons)

#### Primary Button (Основная)
```
Background:  #10B981 (Success Green)
Text:        #FFFFFF (White)
Padding:     12px 24px
Border-radius: 8px
Font-size:   16px
Font-weight: 600

Hover:
  Background: #059669
  Transform: translateY(-1px)
  Box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3)

Active:
  Background: #047857
  Transform: translateY(0)
```

#### Secondary Button (Вторичная)
```
Background:  transparent
Text:        #2E5BFF (Primary Blue)
Border:      2px solid #2E5BFF
Padding:     10px 22px
Border-radius: 8px

Hover:
  Background: #EFF6FF
  Border-color: #1E3A8A
```

#### Ghost Button
```
Background:  transparent
Text:        #64748B (Gray 500)
Padding:     12px 24px

Hover:
  Text: #1E293B (Gray 800)
  Background: #F1F5F9 (Gray 100)
```

#### Disabled State
```
Background:  #E2E8F0 (Gray 200)
Text:        #94A3B8 (Gray 400)
Cursor:      not-allowed
Opacity:     0.6
```

---

### 5.2. Input Fields (Поля ввода)

#### Text Input
```
Height:      40px
Padding:     10px 16px
Border:      1px solid #CBD5E1 (Gray 300)
Border-radius: 8px
Font-size:   16px
Background:  #FFFFFF

Focus:
  Border: 2px solid #2E5BFF
  Box-shadow: 0 0 0 3px rgba(46, 91, 255, 0.1)
  Outline: none

Error:
  Border: 2px solid #EF4444
  Box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)

Disabled:
  Background: #F1F5F9
  Border-color: #E2E8F0
  Cursor: not-allowed
```

#### Search Input
```
Padding-left: 44px  (для иконки)
Icon:        🔍 16px, color: #64748B
```

---

### 5.3. Карточки (Cards)

#### Product Card (Карточка товара)
```
Background:   #FFFFFF
Border:       1px solid #E2E8F0
Border-radius: 12px
Padding:      16px
Box-shadow:   0 1px 3px rgba(0, 0, 0, 0.1)

Hover:
  Transform: translateY(-4px)
  Box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15)
  Border-color: #CBD5E1

Structure:
  - Image (aspect-ratio: 1/1)
  - Title (h6, 2 lines max, ellipsis)
  - Rating (★★★★☆ + count)
  - Price (h5, bold)
  - Old Price (crossed, Gray 500, smaller)
  - CTA Button (full-width)
```

#### Info Card
```
Background:   #F8FAFC
Border:       none
Border-radius: 16px
Padding:      24px
```

---

### 5.4. Badges (Бейджи)

#### Discount Badge (Скидка)
```
Background:   #F59E0B
Text:         #FFFFFF
Padding:      4px 8px
Border-radius: 4px
Font-size:    12px
Font-weight:  700
Position:     absolute (top-left на товаре)

Text:  "-15%" или "SALE"
```

#### Status Badge
```
Success:    background: #D1FAE5, text: #059669
Warning:    background: #FEF3C7, text: #D97706
Error:      background: #FEE2E2, text: #DC2626
Info:       background: #DBEAFE, text: #2563EB

Padding:      6px 12px
Border-radius: 6px
Font-size:    14px
Font-weight:  500
```

#### Count Badge (Счетчик)
```
Background:   #EF4444 (Error Red)
Text:         #FFFFFF
Size:         20px × 20px
Border-radius: 50%
Font-size:    12px
Font-weight:  700
Position:     absolute (top-right на иконке)
```

---

### 5.5. Navigation (Навигация)

#### Header
```
Height:      72px (desktop), 64px (mobile)
Background:  #2E5BFF
Box-shadow:  0 2px 8px rgba(0, 0, 0, 0.1)
Position:    sticky top

Content:
  - Logo (48px height)
  - Search (flex: 1, max-width: 600px)
  - Nav links
  - Icons (cart, profile, favorites)
```

#### Nav Link
```
Text:        #FFFFFF
Padding:     8px 16px
Font-size:   16px
Font-weight: 500

Hover:
  Background: rgba(255, 255, 255, 0.1)
  Border-radius: 6px

Active:
  Background: rgba(255, 255, 255, 0.2)
  Border-bottom: 2px solid #FFFFFF
```

#### Mobile Menu (Burger)
```
Button size: 48px × 48px
Icon:        3 lines, 24px width, 2px height
Color:       #FFFFFF

Menu:
  Width: 280px
  Background: #FFFFFF
  Box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1)
  Animation: slide-in from right
```

---

### 5.6. Footer

```
Background:  #1E293B (Gray 800)
Text:        #CBD5E1 (Gray 300)
Padding:     48px 0 24px

Structure:
  - 4 columns (desktop)
  - 2 columns (tablet)
  - Accordion (mobile)

Links:
  Color: #CBD5E1
  Hover: #FFFFFF
  Font-size: 14px
```

---

## 6. Иконки

### 6.1. Стиль иконок

**Семейство:** Heroicons / Lucide Icons  
**Стиль:** Outline (основной), Solid (акценты)  
**Размеры:**
```
Small:   16px × 16px
Medium:  24px × 24px  (по умолчанию)
Large:   32px × 32px
XLarge:  48px × 48px
```

**Цвета:**
- Primary actions: #2E5BFF
- Secondary: #64748B
- Success: #10B981
- Error: #EF4444

### 6.2. Основные иконки

```
🔍  Search      - Поиск
🛒  Cart        - Корзина
👤  User        - Профиль
♡   Heart       - Избранное
☰   Menu        - Бургер меню
⚙️  Settings    - Настройки
📦  Package     - Заказы
⭐  Star        - Рейтинг
✓   Check       - Успех
✕   X           - Закрыть/Ошибка
→   Arrow       - Навигация
📍  Location    - Адрес
📞  Phone       - Телефон
✉️  Email       - Почта
```

---

## 7. Эффекты и анимации

### 7.1. Transitions

```css
/* Default */
transition: all 0.3s ease;

/* Quick */
transition: all 0.15s ease;

/* Slow */
transition: all 0.5s ease;
```

**Применение:**
- Hover эффекты: 0.3s
- Модальные окна: 0.3s
- Анимация кнопок: 0.15s
- Smooth scroll: 0.5s

### 7.2. Shadows

```css
/* Elevation 1 - Cards */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Elevation 2 - Hover cards */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

/* Elevation 3 - Dropdowns */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

/* Elevation 4 - Modals */
box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
```

### 7.3. Border Radius

```css
/* Small - Badges */
border-radius: 4px;

/* Medium - Buttons, Inputs */
border-radius: 8px;

/* Large - Cards */
border-radius: 12px;

/* XLarge - Images */
border-radius: 16px;

/* Circle - Avatars, Icons */
border-radius: 50%;
```

---

## 8. Сетка и Layout

### 8.1. Container

```css
.container {
  max-width: 1376px;
  padding: 0 32px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
}
```

### 8.2. Grid System

```css
/* 12-column grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

/* Responsive */
@media (max-width: 992px) {
  .grid {
    grid-template-columns: repeat(8, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
}
```

---

## 9. Accessibility

### 9.1. Contrast Ratios

**WCAG 2.1 Level AA:**
- Обычный текст (< 18px): минимум 4.5:1
- Крупный текст (≥ 18px или ≥ 14px bold): минимум 3:1
- Графика и UI элементы: минимум 3:1

### 9.2. Focus States

```css
:focus-visible {
  outline: 2px solid #2E5BFF;
  outline-offset: 2px;
}

button:focus-visible {
  box-shadow: 0 0 0 3px rgba(46, 91, 255, 0.3);
}
```

### 9.3. Alternative Text

- Все изображения должны иметь `alt` атрибут
- Иконки с функцией должны иметь `aria-label`
- Декоративные изображения: `alt=""`

---

## 10. Примеры применения

### 10.1. Главная страница

```
Header:
  - Background: Primary Blue (#2E5BFF)
  - Height: 72px
  - Shadow: Elevation 1

Hero Banner:
  - Height: 400px (desktop), 240px (mobile)
  - Border-radius: 16px
  - Overlay: rgba(0, 0, 0, 0.3)
  - Text: White, h1

Product Grid:
  - Columns: 4 (desktop), 2 (tablet), 1 (mobile)
  - Gap: 24px
  - Cards: Product Card component
```

### 10.2. Страница товара

```
Gallery:
  - Main image: 600px × 600px
  - Thumbnails: 80px × 80px
  - Border-radius: 12px

Info Block:
  - Title: h1
  - Rating: Yellow stars + Gray text
  - Price: h2, Success Green
  - Old price: crossed, Gray 500
  - CTA: Primary Button (Large)
```

---

*Style Guide версия 1.0*  
*Лабораторная работа №5*  
*Проект: ТехноМарт - Интернет-магазин электроники*  
*Дата создания: 2024*


