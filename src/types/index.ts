export type Store = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  region: string;
  manager: string;
  phone: string;
  cpiIndex: number;
  costEffectivenessScore: number;
};

export interface StockItem {
  sku: string;
  productName: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  maxThreshold: number;
  demandForecast: number;
  price: number;
  lastUpdated: string;
}

export interface StoreInventory {
  storeId: string;
  items: StockItem[];
  totalValue: number;
  lowStockCount: number;
  overStockCount: number;
}

export interface TransferSuggestion {
  id: string;
  fromStoreId: string;
  toStoreId: string;
  sku: string;
  productName: string;
  quantity: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedSavings: number;
  distance: number;
  reason: string;
  confidence: number;
  createdAt: string;
  surplus: number;
  shortage: number;
  fuelCost: number;
  co2Impact: number;
  cpiFactor: number;
  isProfitable: boolean;
  cpiIndex?: number; 
}



export interface ForecastData {
  sku: string;
  productName: string;
  storeId: string;
  predictions: Array<{
    date: string;
    demand: number;
    confidence: number;
    factors: string[];
  }>;
  accuracy: number;
  lastUpdated: string;
}

export interface ImpactMetrics {
  period: string;
  totalSavings: number;
  co2Reduced: number;
  stockoutsAvoided: number;
  transfersCompleted: number;
  transfersApproved: number;
  forecastAccuracy: number;
  averageDistance: number;
}