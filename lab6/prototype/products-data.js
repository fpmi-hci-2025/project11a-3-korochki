// All products data
const allProducts = [
    {
        id: 1,
        name: 'Apple iPhone 15 Pro',
        brand: 'apple',
        price: 2999,
        oldPrice: 3499,
        rating: 5,
        image: '📱',
        category: 'smartphones',
        description: 'Топовый смартфон с процессором A17 Pro, 6.1" Super Retina XDR дисплеем и тройной камерой 48 Мп.',
        specs: {
            'Процессор': 'Apple A17 Pro',
            'Память': '256 GB',
            'Камера': '48 Мп',
            'Экран': '6.1" Super Retina XDR',
            'Батарея': '3200 мАч'
        },
        inStock: true
    },
    {
        id: 2,
        name: 'MacBook Pro 14"',
        brand: 'apple',
        price: 4999,
        oldPrice: 5899,
        rating: 5,
        image: '💻',
        category: 'laptops',
        description: 'Мощный ноутбук для профессионалов с чипом M3 Pro, 14.2" Liquid Retina XDR дисплеем.',
        specs: {
            'Процессор': 'Apple M3 Pro',
            'RAM': '18 GB',
            'SSD': '512 GB',
            'Экран': '14.2" Liquid Retina XDR',
            'Батарея': 'До 18 часов'
        },
        inStock: true
    },
    {
        id: 3,
        name: 'AirPods Pro 2',
        brand: 'apple',
        price: 749,
        oldPrice: null,
        rating: 5,
        image: '🎧',
        category: 'headphones',
        description: 'Беспроводные наушники с активным шумоподавлением и пространственным звуком.',
        specs: {
            'Шумоподавление': 'Активное (ANC)',
            'Батарея': 'До 6 часов',
            'Чип': 'Apple H2',
            'Защита': 'IPX4',
            'Кейс': 'MagSafe'
        },
        inStock: true
    },
    {
        id: 4,
        name: 'Samsung Galaxy S23',
        brand: 'samsung',
        price: 2499,
        oldPrice: 2999,
        rating: 4,
        image: '📱',
        category: 'smartphones',
        description: 'Флагманский смартфон Samsung с процессором Snapdragon 8 Gen 2 и камерой 50 Мп.',
        specs: {
            'Процессор': 'Snapdragon 8 Gen 2',
            'Память': '256 GB',
            'Камера': '50 Мп',
            'Экран': '6.1" Dynamic AMOLED 2X',
            'Батарея': '3900 мАч'
        },
        inStock: true
    },
    {
        id: 5,
        name: 'iPad Air 5',
        brand: 'apple',
        price: 1899,
        oldPrice: null,
        rating: 5,
        image: '📲',
        category: 'tablets',
        description: 'Универсальный планшет с чипом M1, поддержкой Apple Pencil и Magic Keyboard.',
        specs: {
            'Процессор': 'Apple M1',
            'Память': '256 GB',
            'Экран': '10.9" Liquid Retina',
            'Камера': '12 Мп',
            'Батарея': 'До 10 часов'
        },
        inStock: true
    },
    {
        id: 6,
        name: 'Apple Watch Series 9',
        brand: 'apple',
        price: 1099,
        oldPrice: 1299,
        rating: 5,
        image: '⌚',
        category: 'watches',
        description: 'Умные часы с функциями мониторинга здоровья, Always-On дисплеем и GPS.',
        specs: {
            'Процессор': 'Apple S9',
            'Экран': '1.9" Always-On Retina',
            'Батарея': 'До 18 часов',
            'Защита': 'WR50 (50 метров)',
            'Датчики': 'ЭКГ, SpO2, температура'
        },
        inStock: true
    },
    {
        id: 7,
        name: 'Samsung Galaxy Tab S9',
        brand: 'samsung',
        price: 1699,
        oldPrice: 1999,
        rating: 5,
        image: '📲',
        category: 'tablets',
        description: 'Премиальный планшет с 11" Dynamic AMOLED дисплеем и S Pen в комплекте.',
        specs: {
            'Процессор': 'Snapdragon 8 Gen 2',
            'Память': '256 GB',
            'Экран': '11" Dynamic AMOLED 2X',
            'Камера': '13 Мп',
            'Батарея': '8400 мАч'
        },
        inStock: true
    },
    {
        id: 8,
        name: 'Sony WH-1000XM5',
        brand: 'sony',
        price: 899,
        oldPrice: null,
        rating: 5,
        image: '🎧',
        category: 'headphones',
        description: 'Премиальные накладные наушники с лучшим в классе шумоподавлением.',
        specs: {
            'Шумоподавление': 'Активное (ANC)',
            'Батарея': 'До 30 часов',
            'Драйверы': '30 мм',
            'Частота': '4-40000 Гц',
            'Вес': '250 г'
        },
        inStock: true
    },
    {
        id: 9,
        name: 'Xiaomi 13 Pro',
        brand: 'xiaomi',
        price: 2199,
        oldPrice: 2699,
        rating: 4,
        image: '📱',
        category: 'smartphones',
        description: 'Флагман Xiaomi с камерой Leica, процессором Snapdragon 8 Gen 2 и 120 Вт зарядкой.',
        specs: {
            'Процессор': 'Snapdragon 8 Gen 2',
            'Память': '256 GB',
            'Камера': '50 Мп (Leica)',
            'Экран': '6.73" AMOLED 120Hz',
            'Батарея': '4820 мАч'
        },
        inStock: true
    },
    {
        id: 10,
        name: 'Lenovo ThinkPad X1',
        brand: 'lenovo',
        price: 3499,
        oldPrice: null,
        rating: 5,
        image: '💻',
        category: 'laptops',
        description: 'Бизнес-ноутбук премиум-класса с процессором Intel Core i7 13-го поколения.',
        specs: {
            'Процессор': 'Intel Core i7-1365U',
            'RAM': '16 GB',
            'SSD': '512 GB',
            'Экран': '14" IPS 1920x1200',
            'Вес': '1.19 кг'
        },
        inStock: true
    },
    {
        id: 11,
        name: 'Samsung Galaxy Watch 6',
        brand: 'samsung',
        price: 799,
        oldPrice: 999,
        rating: 4,
        image: '⌚',
        category: 'watches',
        description: 'Умные часы с функциями мониторинга сна, состава тела и GPS.',
        specs: {
            'Процессор': 'Exynos W930',
            'Экран': '1.5" Super AMOLED',
            'Батарея': 'До 40 часов',
            'Защита': 'IP68, 5ATM',
            'Датчики': 'BIA (состав тела), SpO2'
        },
        inStock: true
    },
    {
        id: 12,
        name: 'NVIDIA GeForce RTX 4080',
        brand: 'nvidia',
        price: 3299,
        oldPrice: null,
        rating: 5,
        image: '🎮',
        category: 'components',
        description: 'Мощная видеокарта для игр и профессиональной работы с поддержкой ray tracing.',
        specs: {
            'Память': '16 GB GDDR6X',
            'Частота': '2505 МГц',
            'Интерфейс': 'PCIe 4.0',
            'Разъёмы': '3x DisplayPort, 1x HDMI',
            'Питание': '320 Вт'
        },
        inStock: true
    },
    {
        id: 13,
        name: 'AMD Ryzen 9 7950X',
        brand: 'amd',
        price: 1899,
        oldPrice: null,
        rating: 5,
        image: '🔧',
        category: 'components',
        description: 'Топовый процессор AMD с 16 ядрами для максимальной производительности.',
        specs: {
            'Ядра/Потоки': '16/32',
            'Частота': '4.5-5.7 ГГц',
            'Кэш': '64 MB L3',
            'TDP': '170 Вт',
            'Сокет': 'AM5'
        },
        inStock: true
    },
    {
        id: 14,
        name: 'Logitech G Pro X Superlight',
        brand: 'logitech',
        price: 399,
        oldPrice: null,
        rating: 5,
        image: '🖱️',
        category: 'gaming',
        description: 'Профессиональная игровая мышь с минимальным весом и точным сенсором.',
        specs: {
            'Сенсор': 'HERO 25K',
            'DPI': 'до 25600',
            'Вес': '63 грамма',
            'Батарея': 'До 70 часов',
            'Подключение': 'Wireless 2.4 ГГц'
        },
        inStock: true
    },
    {
        id: 15,
        name: 'Razer BlackWidow V4 Pro',
        brand: 'razer',
        price: 699,
        oldPrice: 799,
        rating: 5,
        image: '⌨️',
        category: 'gaming',
        description: 'Механическая клавиатура с зелёными переключателями и RGB подсветкой.',
        specs: {
            'Переключатели': 'Razer Green Mechanical',
            'Подсветка': 'Razer Chroma RGB',
            'Подключение': 'USB-C + Wireless',
            'Доп. функции': 'Мультимедиа колесо',
            'Раскладка': 'Full-size'
        },
        inStock: true
    },
    {
        id: 16,
        name: 'PocketBook InkPad 4',
        brand: 'pocketbook',
        price: 549,
        oldPrice: null,
        rating: 4,
        image: '📖',
        category: 'ereaders',
        description: 'Электронная книга с большим 7.8" экраном E Ink Carta и подсветкой.',
        specs: {
            'Экран': '7.8" E Ink Carta 1200x1600',
            'Подсветка': 'SMARTlight',
            'Память': '32 GB',
            'Батарея': 'До 1 месяца',
            'Форматы': 'EPUB, PDF, FB2, MOBI'
        },
        inStock: true
    },
    {
        id: 17,
        name: 'Amazon Kindle Paperwhite',
        brand: 'amazon',
        price: 449,
        oldPrice: null,
        rating: 5,
        image: '📖',
        category: 'ereaders',
        description: 'Популярная электронная книга с защитой от воды и длительным временем работы.',
        specs: {
            'Экран': '6.8" E Ink 300 PPI',
            'Подсветка': 'Регулируемая',
            'Память': '16 GB',
            'Батарея': 'До 10 недель',
            'Защита': 'IPX8 (водонепроницаемая)'
        },
        inStock: true
    },
    {
        id: 18,
        name: 'Зарядка Apple MagSafe 140W',
        brand: 'apple',
        price: 249,
        oldPrice: null,
        rating: 5,
        image: '🔌',
        category: 'chargers',
        description: 'Мощное зарядное устройство USB-C для MacBook Pro с технологией быстрой зарядки.',
        specs: {
            'Мощность': '140 Вт',
            'Тип': 'USB-C',
            'Совместимость': 'MacBook Pro 14" и 16"',
            'Кабель': 'USB-C на MagSafe 3 (2м)',
            'Быстрая зарядка': 'Да'
        },
        inStock: true
    },
    {
        id: 19,
        name: 'Зарядка Dell 130W USB-C',
        brand: 'dell',
        price: 179,
        oldPrice: null,
        rating: 4,
        image: '🔌',
        category: 'chargers',
        description: 'Универсальное зарядное устройство для ноутбуков Dell с USB-C.',
        specs: {
            'Мощность': '130 Вт',
            'Тип': 'USB-C',
            'Совместимость': 'Dell XPS, Latitude, Precision',
            'Кабель': '1.8м',
            'Защита': 'От перегрузки и перегрева'
        },
        inStock: true
    },
    {
        id: 20,
        name: 'Lenovo 65W USB-C Adapter',
        brand: 'lenovo',
        price: 129,
        oldPrice: null,
        rating: 4,
        image: '🔌',
        category: 'chargers',
        description: 'Компактное зарядное устройство для ноутбуков Lenovo ThinkPad.',
        specs: {
            'Мощность': '65 Вт',
            'Тип': 'USB-C',
            'Совместимость': 'ThinkPad, Yoga, IdeaPad',
            'Вес': '180 г',
            'Особенности': 'Компактный дизайн'
        },
        inStock: true
    }
];

