-- ============================================
-- Физическая модель базы данных ТехноМарт
-- СУБД: PostgreSQL 14+
-- Автор: Команда разработки ТехноМарт
-- ============================================

-- Установка расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Создание схемы
CREATE SCHEMA IF NOT EXISTS technomart;
SET search_path TO technomart, public;

-- ============================================
-- ТАБЛИЦА: users
-- Описание: Пользователи системы
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    role VARCHAR(20) NOT NULL DEFAULT 'customer',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT chk_users_role CHECK (role IN ('customer', 'manager', 'admin', 'courier')),
    CONSTRAINT chk_users_gender CHECK (gender IN ('male', 'female', 'other'))
);

-- Индексы для users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = TRUE;

-- Комментарии
COMMENT ON TABLE users IS 'Пользователи системы';
COMMENT ON COLUMN users.role IS 'Роль пользователя: customer, manager, admin, courier';
COMMENT ON COLUMN users.is_active IS 'Активен ли пользователь (не заблокирован)';

-- ============================================
-- ТАБЛИЦА: addresses
-- Описание: Адреса доставки пользователей
-- ============================================
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    street VARCHAR(200) NOT NULL,
    building VARCHAR(20) NOT NULL,
    apartment VARCHAR(20),
    postal_code VARCHAR(20),
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Индексы для addresses
CREATE INDEX idx_addresses_user_id ON addresses(user_id);

COMMENT ON TABLE addresses IS 'Адреса доставки пользователей';

-- ============================================
-- ТАБЛИЦА: categories
-- Описание: Категории товаров (иерархическая структура)
-- ============================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    parent_id UUID,
    slug VARCHAR(200) NOT NULL UNIQUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) 
        REFERENCES categories(id) ON DELETE SET NULL
);

-- Индексы для categories
CREATE UNIQUE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE categories IS 'Иерархическая структура категорий товаров';
COMMENT ON COLUMN categories.slug IS 'URL-friendly идентификатор категории';

-- ============================================
-- ТАБЛИЦА: brands
-- Описание: Бренды товаров
-- ============================================
CREATE TABLE brands (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    logo_url VARCHAR(500),
    website VARCHAR(500),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Индексы для brands
CREATE UNIQUE INDEX idx_brands_name ON brands(name);
CREATE INDEX idx_brands_active ON brands(is_active) WHERE is_active = TRUE;

COMMENT ON TABLE brands IS 'Бренды товаров';

-- ============================================
-- ТАБЛИЦА: products
-- Описание: Товары в каталоге
-- ============================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(500) NOT NULL,
    description TEXT,
    short_description VARCHAR(1000),
    price NUMERIC(10,2) NOT NULL,
    discount_price NUMERIC(10,2),
    category_id UUID NOT NULL,
    brand_id UUID NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    weight NUMERIC(8,3),
    dimensions VARCHAR(100),
    in_stock INTEGER NOT NULL DEFAULT 0,
    reserved_stock INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) 
        REFERENCES categories(id) ON DELETE RESTRICT,
    CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) 
        REFERENCES brands(id) ON DELETE RESTRICT,
    CONSTRAINT chk_products_price CHECK (price >= 0),
    CONSTRAINT chk_products_discount_price CHECK (discount_price IS NULL OR discount_price < price),
    CONSTRAINT chk_products_in_stock CHECK (in_stock >= 0),
    CONSTRAINT chk_products_reserved_stock CHECK (reserved_stock >= 0 AND reserved_stock <= in_stock)
);

-- Индексы для products
CREATE UNIQUE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = TRUE;
-- GIN индекс для полнотекстового поиска
CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);
CREATE INDEX idx_products_description_trgm ON products USING GIN (description gin_trgm_ops);

COMMENT ON TABLE products IS 'Товары в каталоге';
COMMENT ON COLUMN products.sku IS 'Артикул товара (Stock Keeping Unit)';
COMMENT ON COLUMN products.in_stock IS 'Количество товара на складе';
COMMENT ON COLUMN products.reserved_stock IS 'Зарезервированное количество (в корзинах/заказах)';

-- ============================================
-- ТАБЛИЦА: product_images
-- Описание: Изображения товаров
-- ============================================
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_main BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE CASCADE
);

-- Индексы для product_images
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_sort_order ON product_images(product_id, sort_order);

COMMENT ON TABLE product_images IS 'Изображения товаров';

-- ============================================
-- ТАБЛИЦА: product_characteristics
-- Описание: Характеристики товаров
-- ============================================
CREATE TABLE product_characteristics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL,
    name VARCHAR(200) NOT NULL,
    value VARCHAR(500) NOT NULL,
    unit VARCHAR(50),
    sort_order INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT fk_product_characteristics_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE CASCADE
);

-- Индексы для product_characteristics
CREATE INDEX idx_product_characteristics_product_id ON product_characteristics(product_id);

COMMENT ON TABLE product_characteristics IS 'Характеристики товаров (процессор, память, и т.д.)';

-- ============================================
-- ТАБЛИЦА: carts
-- Описание: Корзины покупателей
-- ============================================
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT fk_carts_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Индексы для carts
CREATE UNIQUE INDEX idx_carts_user_id ON carts(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_carts_session_id ON carts(session_id) WHERE session_id IS NOT NULL;

COMMENT ON TABLE carts IS 'Корзины покупателей';
COMMENT ON COLUMN carts.session_id IS 'Идентификатор сессии для неавторизованных пользователей';

-- ============================================
-- ТАБЛИЦА: cart_items
-- Описание: Товары в корзине
-- ============================================
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) 
        REFERENCES carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT chk_cart_items_quantity CHECK (quantity > 0)
);

-- Индексы для cart_items
CREATE UNIQUE INDEX idx_cart_items_cart_product ON cart_items(cart_id, product_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);

COMMENT ON TABLE cart_items IS 'Товары в корзине';

-- ============================================
-- ТАБЛИЦА: orders
-- Описание: Заказы покупателей
-- ============================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'created',
    total_amount NUMERIC(10,2) NOT NULL,
    discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    delivery_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    payment_method VARCHAR(20),
    delivery_method VARCHAR(20),
    delivery_address JSONB,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    delivery_date TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT chk_orders_status CHECK (status IN ('created', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    CONSTRAINT chk_orders_payment_method CHECK (payment_method IN ('card', 'cash', 'installment')),
    CONSTRAINT chk_orders_delivery_method CHECK (delivery_method IN ('courier', 'pickup', 'post')),
    CONSTRAINT chk_orders_total_amount CHECK (total_amount >= 0)
);

-- Индексы для orders
CREATE UNIQUE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

COMMENT ON TABLE orders IS 'Заказы покупателей';
COMMENT ON COLUMN orders.order_number IS 'Уникальный номер заказа для отображения клиенту';
COMMENT ON COLUMN orders.delivery_address IS 'JSON с адресом доставки';

-- ============================================
-- ТАБЛИЦА: order_items
-- Описание: Позиции в заказе
-- ============================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) 
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE RESTRICT,
    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_items_unit_price CHECK (unit_price >= 0),
    CONSTRAINT chk_order_items_total_price CHECK (total_price >= 0)
);

-- Индексы для order_items
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

COMMENT ON TABLE order_items IS 'Позиции (товары) в заказе';

-- ============================================
-- ТАБЛИЦА: payments
-- Описание: Платежи по заказам
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    method VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    transaction_id VARCHAR(200),
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) 
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT chk_payments_status CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    CONSTRAINT chk_payments_amount CHECK (amount >= 0)
);

-- Индексы для payments
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id) WHERE transaction_id IS NOT NULL;

COMMENT ON TABLE payments IS 'Платежи по заказам';
COMMENT ON COLUMN payments.transaction_id IS 'ID транзакции в платежной системе';

-- ============================================
-- ТАБЛИЦА: deliveries
-- Описание: Доставка заказов
-- ============================================
CREATE TABLE deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL,
    method VARCHAR(20) NOT NULL,
    tracking_number VARCHAR(200),
    carrier_name VARCHAR(200),
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    estimated_date TIMESTAMP WITH TIME ZONE,
    actual_date TIMESTAMP WITH TIME ZONE,
    address JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT fk_deliveries_order FOREIGN KEY (order_id) 
        REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT chk_deliveries_status CHECK (status IN ('pending', 'picked', 'in_transit', 'out_for_delivery', 'delivered', 'failed'))
);

-- Индексы для deliveries
CREATE INDEX idx_deliveries_order_id ON deliveries(order_id);
CREATE INDEX idx_deliveries_tracking_number ON deliveries(tracking_number) WHERE tracking_number IS NOT NULL;
CREATE INDEX idx_deliveries_status ON deliveries(status);

COMMENT ON TABLE deliveries IS 'Информация о доставке заказов';

-- ============================================
-- ТАБЛИЦА: reviews
-- Описание: Отзывы о товарах
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL,
    user_id UUID NOT NULL,
    rating INTEGER NOT NULL,
    title VARCHAR(500),
    content TEXT,
    pros TEXT,
    cons TEXT,
    is_recommended BOOLEAN,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    moderated_at TIMESTAMP WITH TIME ZONE,
    moderator_id UUID,
    
    CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_moderator FOREIGN KEY (moderator_id) 
        REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT chk_reviews_rating CHECK (rating >= 1 AND rating <= 5),
    CONSTRAINT chk_reviews_status CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Индексы для reviews
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

COMMENT ON TABLE reviews IS 'Отзывы покупателей о товарах';
COMMENT ON COLUMN reviews.status IS 'Статус модерации: pending, approved, rejected';

-- ============================================
-- ТАБЛИЦА: review_images
-- Описание: Изображения к отзывам
-- ============================================
CREATE TABLE review_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    caption VARCHAR(200),
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_review_images_review FOREIGN KEY (review_id) 
        REFERENCES reviews(id) ON DELETE CASCADE
);

-- Индексы для review_images
CREATE INDEX idx_review_images_review_id ON review_images(review_id);

COMMENT ON TABLE review_images IS 'Фотографии, прикрепленные к отзывам';

-- ============================================
-- ТАБЛИЦА: review_helpfulness
-- Описание: Оценки полезности отзывов
-- ============================================
CREATE TABLE review_helpfulness (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    review_id UUID NOT NULL,
    user_id UUID NOT NULL,
    is_helpful BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_review_helpfulness_review FOREIGN KEY (review_id) 
        REFERENCES reviews(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_helpfulness_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- Индексы для review_helpfulness
CREATE UNIQUE INDEX idx_review_helpfulness_review_user ON review_helpfulness(review_id, user_id);
CREATE INDEX idx_review_helpfulness_review_id ON review_helpfulness(review_id);

COMMENT ON TABLE review_helpfulness IS 'Голоса пользователей о полезности отзывов';

-- ============================================
-- ТАБЛИЦА: product_ratings
-- Описание: Агрегированные рейтинги товаров
-- ============================================
CREATE TABLE product_ratings (
    product_id UUID PRIMARY KEY,
    average_rating NUMERIC(3,2) NOT NULL DEFAULT 0,
    total_reviews INTEGER NOT NULL DEFAULT 0,
    rating_distribution JSONB,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_product_ratings_product FOREIGN KEY (product_id) 
        REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT chk_product_ratings_average CHECK (average_rating >= 0 AND average_rating <= 5),
    CONSTRAINT chk_product_ratings_total CHECK (total_reviews >= 0)
);

COMMENT ON TABLE product_ratings IS 'Агрегированные рейтинги и статистика отзывов по товарам';
COMMENT ON COLUMN product_ratings.rating_distribution IS 'JSON с распределением оценок {1: count, 2: count, ...}';

-- ============================================
-- ТРИГГЕРЫ
-- ============================================

-- Триггер для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Применение триггера к таблицам
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveries_updated_at BEFORE UPDATE ON deliveries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Триггер для автоматического обновления рейтинга товара при добавлении/изменении отзыва
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Обновляем агрегированный рейтинг
    INSERT INTO product_ratings (product_id, average_rating, total_reviews, rating_distribution, last_updated)
    SELECT 
        product_id,
        ROUND(AVG(rating)::numeric, 2) as average_rating,
        COUNT(*) as total_reviews,
        jsonb_build_object(
            '1', COUNT(*) FILTER (WHERE rating = 1),
            '2', COUNT(*) FILTER (WHERE rating = 2),
            '3', COUNT(*) FILTER (WHERE rating = 3),
            '4', COUNT(*) FILTER (WHERE rating = 4),
            '5', COUNT(*) FILTER (WHERE rating = 5)
        ) as rating_distribution,
        CURRENT_TIMESTAMP
    FROM reviews
    WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
      AND status = 'approved'
    GROUP BY product_id
    ON CONFLICT (product_id) DO UPDATE SET
        average_rating = EXCLUDED.average_rating,
        total_reviews = EXCLUDED.total_reviews,
        rating_distribution = EXCLUDED.rating_distribution,
        last_updated = EXCLUDED.last_updated;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_after_review_insert AFTER INSERT ON reviews
    FOR EACH ROW WHEN (NEW.status = 'approved')
    EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER update_rating_after_review_update AFTER UPDATE ON reviews
    FOR EACH ROW WHEN (NEW.status = 'approved' OR OLD.status = 'approved')
    EXECUTE FUNCTION update_product_rating();

CREATE TRIGGER update_rating_after_review_delete AFTER DELETE ON reviews
    FOR EACH ROW WHEN (OLD.status = 'approved')
    EXECUTE FUNCTION update_product_rating();

-- ============================================
-- ПРЕДСТАВЛЕНИЯ (VIEWS)
-- ============================================

-- Представление для товаров с полной информацией
CREATE OR REPLACE VIEW v_products_full AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.short_description,
    p.price,
    p.discount_price,
    p.sku,
    p.weight,
    p.dimensions,
    p.in_stock,
    p.is_active,
    c.name as category_name,
    c.slug as category_slug,
    b.name as brand_name,
    b.logo_url as brand_logo,
    COALESCE(pr.average_rating, 0) as average_rating,
    COALESCE(pr.total_reviews, 0) as total_reviews,
    p.created_at,
    p.updated_at
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN product_ratings pr ON p.id = pr.product_id;

-- Представление для заказов с детальной информацией
CREATE OR REPLACE VIEW v_orders_detailed AS
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.total_amount,
    o.discount_amount,
    o.delivery_amount,
    o.payment_method,
    o.delivery_method,
    o.created_at,
    u.email as customer_email,
    u.first_name as customer_first_name,
    u.last_name as customer_last_name,
    u.phone as customer_phone,
    p.status as payment_status,
    d.status as delivery_status,
    d.tracking_number
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN payments p ON o.id = p.order_id
LEFT JOIN deliveries d ON o.id = d.order_id;

-- ============================================
-- НАЧАЛЬНЫЕ ДАННЫЕ
-- ============================================

-- Создание администратора по умолчанию (пароль: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_active) VALUES
('admin@technomart.com', '$2b$10$ZKlKvPxqEjKY8hGxLnUVqOK3vqXc.L1EkJXfNvLQXKjR8qKl2gQ3W', 'Admin', 'System', 'admin', TRUE);

-- Создание корневых категорий
INSERT INTO categories (name, description, slug, sort_order, is_active) VALUES
('Компьютеры и ноутбуки', 'Компьютерная техника', 'computers-laptops', 1, TRUE),
('Смартфоны и планшеты', 'Мобильные устройства', 'smartphones-tablets', 2, TRUE),
('Телевизоры и аудио', 'ТВ и аудиотехника', 'tv-audio', 3, TRUE),
('Бытовая техника', 'Техника для дома', 'home-appliances', 4, TRUE),
('Комплектующие', 'Комплектующие для ПК', 'components', 5, TRUE);

-- ============================================
-- ПОЛИТИКИ БЕЗОПАСНОСТИ (Row Level Security)
-- ============================================

-- Включение RLS для чувствительных таблиц
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Политика: пользователи видят только свои данные
CREATE POLICY user_isolation_policy ON users
    FOR ALL
    TO PUBLIC
    USING (id = current_setting('app.current_user_id')::UUID OR 
           current_setting('app.current_user_role') IN ('admin', 'manager'));

-- Политика: пользователи видят только свои заказы
CREATE POLICY order_isolation_policy ON orders
    FOR ALL
    TO PUBLIC
    USING (user_id = current_setting('app.current_user_id')::UUID OR 
           current_setting('app.current_user_role') IN ('admin', 'manager'));

-- ============================================
-- ФУНКЦИИ ДЛЯ БИЗНЕС-ЛОГИКИ
-- ============================================

-- Функция для генерации номера заказа
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR(50) AS $$
DECLARE
    year_part VARCHAR(4);
    seq_part VARCHAR(10);
BEGIN
    year_part := TO_CHAR(CURRENT_DATE, 'YYYY');
    seq_part := LPAD(nextval('order_number_seq')::TEXT, 6, '0');
    RETURN 'ORD-' || year_part || '-' || seq_part;
END;
$$ LANGUAGE plpgsql;

-- Создание последовательности для номеров заказов
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- ============================================
-- КОНЕЦ СКРИПТА
-- ============================================

-- Вывод информации о созданных объектах
SELECT 'База данных ТехноМарт успешно создана!' as message;
SELECT COUNT(*) as total_tables FROM information_schema.tables 
WHERE table_schema = 'technomart' AND table_type = 'BASE TABLE';

