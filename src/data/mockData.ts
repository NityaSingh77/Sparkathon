import { Store, StoreInventory, TransferSuggestion, ForecastData, ImpactMetrics, StockItem } from '../types';

export const stores: Store[] = [
  {
    id: 'store-001',
    name: 'Walmart Supercenter - Downtown',
    address: '123 Main St, Downtown, TX 75201',
    lat: 32.7767,
    lng: -96.7970,
    region: 'North Texas',
    manager: 'John Smith',
    phone: '(214) 555-0101'
  },
  {
    id: 'store-002',
    name: 'Walmart Neighborhood Market - Uptown',
    address: '456 Oak Ave, Uptown, TX 75202',
    lat: 32.7877,
    lng: -96.8070,
    region: 'North Texas',
    manager: 'Sarah Johnson',
    phone: '(214) 555-0102'
  },
  {
    id: 'store-003',
    name: 'Walmart Supercenter - Suburbs',
    address: '789 Pine Rd, Suburbs, TX 75203',
    lat: 32.7667,
    lng: -96.7870,
    region: 'North Texas',
    manager: 'Mike Davis',
    phone: '(214) 555-0103'
  },
  {
    id: 'store-004',
    name: 'Walmart Express - Midtown',
    address: '321 Elm St, Midtown, TX 75204',
    lat: 32.7977,
    lng: -96.8170,
    region: 'North Texas',
    manager: 'Lisa Chen',
    phone: '(214) 555-0104'
  },
  {
    id: 'store-005',
    name: 'Walmart Supercenter - Eastside',
    address: '654 Maple Dr, Eastside, TX 75205',
    lat: 32.7567,
    lng: -96.7670,
    region: 'North Texas',
    manager: 'Robert Wilson',
    phone: '(214) 555-0105'
  },
  {
    id: 'store-006',
    name: 'Walmart Supercenter - Downtown Dallas',
    address: '123 Main St, Dallas, TX',
    lat: 32.7767,
    lng: -96.7970,
    region: 'North Texas',
    manager: 'John Smith',
    phone: '(214) 555-0101'
  },
  {
    id: 'store-007',
    name: 'Walmart Neighborhood Market - Houston',
    address: '789 Pine Rd, Houston, TX',
    lat: 29.7604,
    lng: -95.3698,
    region: 'South Texas',
    manager: 'Sarah Lee',
    phone: '(713) 555-0102'
  },
  {
    id: 'store-008',
    name: 'Walmart Express - Austin',
    address: '456 Oak Ave, Austin, TX',
    lat: 30.2672,
    lng: -97.7431,
    region: 'Central Texas',
    manager: 'Carlos Martinez',
    phone: '(512) 555-0103'
  },
  {
    id: 'store-009',
    name: 'Walmart Supercenter - El Paso',
    address: '321 Elm St, El Paso, TX',
    lat: 31.7619,
    lng: -106.4850,
    region: 'West Texas',
    manager: 'Priya Kapoor',
    phone: '(915) 555-0104'
  },
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
  {
    sku: 'SKU-004',
    productName: 'KitchenAid Stand Mixer',
    category: 'Home & Kitchen',
    currentStock: Math.floor(Math.random() * 20) + 5,
    minThreshold: 8,
    maxThreshold: 35,
    demandForecast: Math.floor(Math.random() * 12) + 8,
    price: 349.99,
    lastUpdated: new Date().toISOString()
  },
  {
    sku: 'SKU-005',
    productName: 'Organic Baby Formula',
    category: 'Baby & Kids',
    currentStock: Math.floor(Math.random() * 80) + 15,
    minThreshold: 20,
    maxThreshold: 120,
    demandForecast: Math.floor(Math.random() * 35) + 25,
    price: 28.99,
    lastUpdated: new Date().toISOString()
  }
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
    id: 'transfer-001',
    fromStoreId: 'store-003',
    toStoreId: 'store-001',
    sku: 'SKU-001',
    productName: 'iPhone 15 Pro Max',
    quantity: 12,
    urgency: 'high',
    estimatedSavings: 2400,
    distance: 8.5,
    reason: 'Downtown store critically low, suburbs overstocked',
    confidence: 0.94,
    createdAt: new Date().toISOString()
  },
  {
    id: 'transfer-002',
    fromStoreId: 'store-002',
    toStoreId: 'store-004',
    sku: 'SKU-002',
    productName: 'Samsung 65" 4K TV',
    quantity: 5,
    urgency: 'medium',
    estimatedSavings: 1200,
    distance: 4.2,
    reason: 'Predicted demand spike in Midtown next week',
    confidence: 0.87,
    createdAt: new Date().toISOString()
  },
  {
    id: 'transfer-003',
    fromStoreId: 'store-005',
    toStoreId: 'store-002',
    sku: 'SKU-003',
    productName: 'Nike Air Max Sneakers',
    quantity: 25,
    urgency: 'low',
    estimatedSavings: 800,
    distance: 12.1,
    reason: 'Seasonal rebalancing for back-to-school',
    confidence: 0.76,
    createdAt: new Date().toISOString()
  },
  {
    id: 'transfer-004',
    fromStoreId: 'store-001',
    toStoreId: 'store-003',
    sku: 'SKU-004',
    productName: 'KitchenAid Stand Mixer',
    quantity: 8,
    urgency: 'critical',
    estimatedSavings: 1800,
    distance: 8.5,
    reason: 'Holiday cooking season approaching, suburbs showing high demand',
    confidence: 0.91,
    createdAt: new Date().toISOString()
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