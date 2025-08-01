import { Store, StoreInventory, TransferSuggestion, ForecastData, ImpactMetrics, StockItem } from '../types';

export const stores: Store[] = [
  {
    id: 'store-001',
    name: 'Downtown Supercenter',
    address: '123 Main St, Dallas, TX 75201',
    lat: 32.7767,
    lng: -96.7970,
    region: 'North Texas',
    manager: 'John Smith',
    phone: '(214) 555-0101',
    cpiIndex: 104.5,
    costEffectivenessScore: 0.82
  },
  {
    id: 'store-002',
    name: 'Uptown Neighborhood',
    address: '456 Oak Ave, Dallas, TX 75202',
    lat: 32.7877,
    lng: -96.8070,
    region: 'North Texas',
    manager: 'Sarah Johnson',
    phone: '(214) 555-0102',
    cpiIndex: 102.9,
    costEffectivenessScore: 0.77
  },
  {
    id: 'store-003',
    name: 'Suburbs Supercenter',
    address: '789 Pine Rd, Dallas, TX 75203',
    lat: 32.7667,
    lng: -96.7870,
    region: 'North Texas',
    manager: 'Mike Davis',
    phone: '(214) 555-0103',
    cpiIndex: 101.8,
    costEffectivenessScore: 0.89
  },
  {
    id: 'store-004',
    name: 'Walmart Express - Midtown Dallas',
    address: '321 Elm St, Dallas, TX 75204',
    lat: 32.7977,
    lng: -96.8170,
    region: 'North Texas',
    manager: 'Lisa Chen',
    phone: '(214) 555-0104',
    cpiIndex: 103.2,
    costEffectivenessScore: 0.73
  },
  {
    id: 'store-005',
    name: 'Walmart Supercenter - Eastside Dallas',
    address: '654 Maple Dr, Dallas, TX 75205',
    lat: 32.7567,
    lng: -96.7670,
    region: 'North Texas',
    manager: 'Robert Wilson',
    phone: '(214) 555-0105',
    cpiIndex: 105.0,
    costEffectivenessScore: 0.69
  },
  {
    id: 'store-006',
    name: 'Walmart Supercenter - Houston',
    address: '123 Commerce St, Houston, TX',
    lat: 29.7604,
    lng: -95.3698,
    region: 'South Texas',
    manager: 'Sarah Lee',
    phone: '(713) 555-0102',
    cpiIndex: 99.5,
    costEffectivenessScore: 0.88
  },
  {
    id: 'store-007',
    name: 'Walmart Neighborhood Market - Austin',
    address: '789 Pine Rd, Austin, TX',
    lat: 30.2672,
    lng: -97.7431,
    region: 'Central Texas',
    manager: 'Carlos Martinez',
    phone: '(512) 555-0103',
    cpiIndex: 101.1,
    costEffectivenessScore: 0.83
  },
  {
    id: 'store-008',
    name: 'Walmart Express - El Paso',
    address: '456 Oak Ave, El Paso, TX',
    lat: 31.7619,
    lng: -106.4850,
    region: 'West Texas',
    manager: 'Priya Kapoor',
    phone: '(915) 555-0104',
    cpiIndex: 98.9,
    costEffectivenessScore: 0.91
  },
  {
    id: 'store-009',
    name: 'Walmart Supercenter - San Antonio',
    address: '321 Elm St, San Antonio, TX',
    lat: 29.4241,
    lng: -98.4936,
    region: 'South Texas',
    manager: 'Angela Brooks',
    phone: '(210) 555-0105',
    cpiIndex: 100.3,
    costEffectivenessScore: 0.84
  }
];


const generateStockItems = (): StockItem[] => [
  {
    sku: 'SKU-001',
    productName: 'iPhone 15 Pro Max',
    category: 'Electronics',
    currentStock: Math.floor(Math.random() * 50) + 10,
    minThreshold: 15,
    maxThreshold: 80,
    demandForecast: Math.floor(Math.random() * 30) + 20,
    price: 1199.99,
    lastUpdated: new Date().toISOString()
  },
  {
    sku: 'SKU-002',
    productName: 'Samsung 65" 4K TV',
    category: 'Electronics',
    currentStock: Math.floor(Math.random() * 30) + 5,
    minThreshold: 8,
    maxThreshold: 40,
    demandForecast: Math.floor(Math.random() * 15) + 10,
    price: 899.99,
    lastUpdated: new Date().toISOString()
  },
  {
    sku: 'SKU-003',
    productName: 'Nike Air Max Sneakers',
    category: 'Apparel',
    currentStock: Math.floor(Math.random() * 100) + 20,
    minThreshold: 25,
    maxThreshold: 150,
    demandForecast: Math.floor(Math.random() * 40) + 30,
    price: 129.99,
    lastUpdated: new Date().toISOString()
  },
  // {
  //   sku: 'SKU-004',
  //   productName: 'KitchenAid Stand Mixer',
  //   category: 'Home & Kitchen',
  //   currentStock: Math.floor(Math.random() * 20) + 5,
  //   minThreshold: 8,
  //   maxThreshold: 35,
  //   demandForecast: Math.floor(Math.random() * 12) + 8,
  //   price: 349.99,
  //   lastUpdated: new Date().toISOString()
  // },
  // {
  //   sku: 'SKU-005',
  //   productName: 'Organic Baby Formula',
  //   category: 'Baby & Kids',
  //   currentStock: Math.floor(Math.random() * 80) + 15,
  //   minThreshold: 20,
  //   maxThreshold: 120,
  //   demandForecast: Math.floor(Math.random() * 35) + 25,
  //   price: 28.99,
  //   lastUpdated: new Date().toISOString()
  // }
];

export const storeInventories: StoreInventory[] = [
  {
    storeId: 'store-001',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 12,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 25,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 42,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 20,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 12 * 1199.99 + 42 * 899.99,
    lowStockCount: 1,
    overStockCount: 0
  },
  {
    storeId: 'store-002',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 70,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 15,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 8,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 18,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 70 * 1199.99 + 8 * 899.99,
    lowStockCount: 1,
    overStockCount: 1
  },
  {
    storeId: 'store-003',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 58,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 10,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 18,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 15,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 58 * 1199.99 + 18 * 899.99,
    lowStockCount: 0,
    overStockCount: 1
  },
  {
    storeId: 'store-004',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 19,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 23,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 50,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 14,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 19 * 1199.99 + 50 * 899.99,
    lowStockCount: 1,
    overStockCount: 1
  },
  {
    storeId: 'store-005',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 65,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 17,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 13,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 13,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 65 * 1199.99 + 13 * 899.99,
    lowStockCount: 1,
    overStockCount: 1
  },
  {
    storeId: 'store-006',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 22,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 24,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 10,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 19,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 22 * 1199.99 + 10 * 899.99,
    lowStockCount: 1,
    overStockCount: 0
  },
  {
    storeId: 'store-007',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 80,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 10,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 5,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 25,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 80 * 1199.99 + 5 * 899.99,
    lowStockCount: 1,
    overStockCount: 1
  },
  {
    storeId: 'store-008',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 35,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 22,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 46,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 17,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 35 * 1199.99 + 46 * 899.99,
    lowStockCount: 0,
    overStockCount: 1
  },
  {
    storeId: 'store-009',
    items: [
      {
        sku: 'SKU-001',
        productName: 'iPhone 15 Pro Max',
        category: 'Electronics',
        currentStock: 16,
        minThreshold: 20,
        maxThreshold: 60,
        demandForecast: 21,
        price: 1199.99,
        lastUpdated: new Date().toISOString()
      },
      {
        sku: 'SKU-002',
        productName: 'Samsung 65" 4K TV',
        category: 'Electronics',
        currentStock: 14,
        minThreshold: 15,
        maxThreshold: 45,
        demandForecast: 12,
        price: 899.99,
        lastUpdated: new Date().toISOString()
      }
    ],
    totalValue: 16 * 1199.99 + 14 * 899.99,
    lowStockCount: 2,
    overStockCount: 0
  }
];

export const transferSuggestions: TransferSuggestion[] = [
  {
    id: 'ts-001',
    fromStoreId: 'store-005',
    toStoreId: 'store-003',
    sku: 'SKU-1001',
    productName: 'iPhone 15 Pro Max',
    quantity: 160,
    urgency: 'high',
    estimatedSavings: 320,
    distance: 25.5,
    reason: 'High surplus matched with critical shortage',
    confidence: 0.93,
    createdAt: new Date().toISOString(),
    surplus: 180,
    shortage: 160,
    fuelCost: 120.0,
    co2Impact: 75.0,
    cpiFactor: 0.93,
    cpiIndex: 0.93,
    isProfitable: true
  },
  {
    id: 'ts-002',
    fromStoreId: 'store-001',
    toStoreId: 'store-004',
    sku: 'SKU-1002',
    productName: 'Samsung 65" 4K TV',
    quantity: 110,
    urgency: 'medium',
    estimatedSavings: 275,
    distance: 18.4,
    reason: 'Demand spike in destination store',
    confidence: 0.89,
    createdAt: new Date().toISOString(),
    surplus: 130,
    shortage: 110,
    fuelCost: 80.0,
    co2Impact: 55.0,
    cpiFactor: 0.91,
    cpiIndex: 0.91,
    isProfitable: true
  },
  {
    id: 'ts-003',
    fromStoreId: 'store-006',
    toStoreId: 'store-002',
    sku: 'SKU-1003',
    productName: 'Nike Air Max Sneakers',
    quantity: 200,
    urgency: 'medium',
    estimatedSavings: 500,
    distance: 31.2,
    reason: 'Urgent stockout risk in receiving store',
    confidence: 0.97,
    createdAt: new Date().toISOString(),
    surplus: 220,
    shortage: 200,
    fuelCost: 170.0,
    co2Impact: 90.0,
    cpiFactor: 0.95,
    cpiIndex: 0.95,
    isProfitable: true
  },
  {
    id: 'ts-004',
    fromStoreId: 'store-008',
    toStoreId: 'store-007',
    sku: 'SKU-1004',
    productName: 'Detergent',
    quantity: 100,
    urgency: 'medium',
    estimatedSavings: 210,
    distance: 27.9,
    reason: 'Balanced match of need and availability',
    confidence: 0.88,
    createdAt: new Date().toISOString(),
    surplus: 150,
    shortage: 100,
    fuelCost: 160.0,
    co2Impact: 100.0,
    cpiFactor: 0.97,
    cpiIndex: 0.97,
    isProfitable: true
  },
  {
    id: 'ts-005',
    fromStoreId: 'store-004',
    toStoreId: 'store-009',
    sku: 'SKU-1005',
    productName: 'Frozen Pizza',
    quantity: 65,
    urgency: 'low',
    estimatedSavings: 90,
    distance: 22.6,
    reason: 'Not optimal transfer but necessary to avoid waste',
    confidence: 0.75,
    createdAt: new Date().toISOString(),
    surplus: 90,
    shortage: 70,
    fuelCost: 135.0,
    co2Impact: 82.0,
    cpiFactor: 0.92,
    cpiIndex: 0.92,
    isProfitable: false
  },
  {
    id: 'ts-006',
    fromStoreId: 'store-002',
    toStoreId: 'store-006',
    sku: 'SKU-2001',
    productName: 'Sony Noise Cancelling Headphones',
    quantity: 40,
    urgency: 'high',
    estimatedSavings: 800,
    distance: 45.3,
    reason: 'High surplus in tech hub store',
    confidence: 0.91,
    createdAt: new Date().toISOString(),
    surplus: 70,
    shortage: 45,
    fuelCost: 200.0,
    co2Impact: 120.0,
    cpiFactor: 1.02,
    cpiIndex: 1.02,
    isProfitable: true
  },
  {
    id: 'ts-007',
    fromStoreId: 'store-001',
    toStoreId: 'store-008',
    sku: 'SKU-2002',
    productName: 'Fitbit Charge 6',
    quantity: 35,
    urgency: 'medium',
    estimatedSavings: 650,
    distance: 39.1,
    reason: 'Health gadgets demand rise in receiving store',
    confidence: 0.89,
    createdAt: new Date().toISOString(),
    surplus: 60,
    shortage: 35,
    fuelCost: 150.0,
    co2Impact: 98.0,
    cpiFactor: 1.04,
    cpiIndex: 1.04,
    isProfitable: true
  },
  {
    id: 'ts-008',
    fromStoreId: 'store-003',
    toStoreId: 'store-007',
    sku: 'SKU-2003',
    productName: 'GoPro Hero 12',
    quantity: 25,
    urgency: 'medium',
    estimatedSavings: 550,
    distance: 47.8,
    reason: 'Demand surge during travel season',
    confidence: 0.87,
    createdAt: new Date().toISOString(),
    surplus: 50,
    shortage: 30,
    fuelCost: 190.0,
    co2Impact: 110.0,
    cpiFactor: 1.06,
    cpiIndex: 1.06,
    isProfitable: true
  },
  {
    id: 'ts-009',
    fromStoreId: 'store-005',
    toStoreId: 'store-002',
    sku: 'SKU-2004',
    productName: 'Apple Watch Series 9',
    quantity: 30,
    urgency: 'high',
    estimatedSavings: 700,
    distance: 33.4,
    reason: 'High-end wearable shortage',
    confidence: 0.93,
    createdAt: new Date().toISOString(),
    surplus: 55,
    shortage: 30,
    fuelCost: 100.0,
    co2Impact: 95.0,
    cpiFactor: 1.08,
    cpiIndex: 1.08,
    isProfitable: true
  },
  {
    id: 'ts-010',
    fromStoreId: 'store-009',
    toStoreId: 'store-001',
    sku: 'SKU-2005',
    productName: 'Canon EOS R6 Camera',
    quantity: 20,
    urgency: 'critical',
    estimatedSavings: 950,
    distance: 52.1,
    reason: 'Urgent demand from photography store',
    confidence: 0.96,
    createdAt: new Date().toISOString(),
    surplus: 40,
    shortage: 25,
    fuelCost: 210.0,
    co2Impact: 130.0,
    cpiFactor: 1.12,
    cpiIndex: 1.12,
    isProfitable: true
  }
];




export const forecastData: ForecastData[] = [
  {
    sku: 'SKU-001',
    productName: 'iPhone 15 Pro Max',
    storeId: 'store-001',
    predictions: [
      { date: '2024-01-15', demand: 25, confidence: 0.89, factors: ['New release hype', 'Downtown demographics'] },
      { date: '2024-01-16', demand: 22, confidence: 0.85, factors: ['Weekend traffic', 'Marketing campaign'] },
      { date: '2024-01-17', demand: 18, confidence: 0.92, factors: ['Weekday pattern', 'Price sensitivity'] }
    ],
    accuracy: 0.87,
    lastUpdated: new Date().toISOString()
  }
];

export const impactMetrics: ImpactMetrics = {
  period: 'Last 30 Days',
  totalSavings: 45600,
  co2Reduced: 1240,
  stockoutsAvoided: 89,
  transfersCompleted: 156,
  transfersApproved: 189,
  forecastAccuracy: 0.89,
  averageDistance: 8.7
};