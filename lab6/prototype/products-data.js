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
        name: 'Sony PlayStation 5',
        brand: 'sony',
        price: 1499,
        oldPrice: null,
        rating: 5,
        image: '🎮',
        category: 'gaming',
        description: 'Игровая консоль нового поколения с поддержкой 4K и трассировки лучей.',
        specs: {
            'Процессор': 'AMD Zen 2',
            'GPU': 'AMD RDNA 2',
            'Память': '825 GB SSD',
            'Разрешение': '4K, до 120 FPS',
            'Привод': 'Ultra HD Blu-ray'
        },
        inStock: false
    }
];

