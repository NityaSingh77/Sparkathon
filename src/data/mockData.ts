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

export const storeInventories: StoreInventory[] = stores.map(store => {
  const items = generateStockItems();
  return {
    storeId: store.id,
    items,
    totalValue: items.reduce((sum, item) => sum + (item.currentStock * item.price), 0),
    lowStockCount: items.filter(item => item.currentStock < item.minThreshold).length,
    overStockCount: items.filter(item => item.currentStock > item.maxThreshold).length
  };
});

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