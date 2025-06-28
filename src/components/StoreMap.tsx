import React, { useState } from 'react';
import { MapPin, Package, AlertTriangle,  Users } from 'lucide-react';
import { stores, storeInventories } from '../data/mockData';
import { Store } from '../types';

const StoreMap: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedSku, setSelectedSku] = useState<string>('SKU-001');

  const getStoreInventory = (storeId: string) => {
    return storeInventories.find(inv => inv.storeId === storeId);
  };

  const getStockStatus = (storeId: string, sku: string) => {
    const inventory = getStoreInventory(storeId);
    const item = inventory?.items.find(item => item.sku === sku);
    if (!item) return 'unknown';
    
    if (item.currentStock < item.minThreshold) return 'low';
    if (item.currentStock > item.maxThreshold) return 'high';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-red-500';
      case 'high': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const skuOptions = [
    { value: 'SKU-001', label: 'iPhone 15 Pro Max' },
    { value: 'SKU-002', label: 'Samsung 65" 4K TV' },
    { value: 'SKU-003', label: 'Nike Air Max Sneakers' },
    { value: 'SKU-004', label: 'KitchenAid Stand Mixer' },
    { value: 'SKU-005', label: 'Organic Baby Formula' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Store Network Map</h2>
          <p className="text-gray-400">Real-time inventory visualization across all locations</p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-400">Product:</label>
          <select
            value={selectedSku}
            onChange={(e) => setSelectedSku(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {skuOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-6 h-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
            <div className="relative h-full">
              <div className="text-center text-gray-400 mb-4">
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm">North Texas Region</span>
              </div>
              
              {/* Simulated Map with Store Markers */}
              <div className="relative h-full">
                {stores.map((store, index) => {
                  const status = getStockStatus(store.id, selectedSku);
                  const inventory = getStoreInventory(store.id);
                  const item = inventory?.items.find(item => item.sku === selectedSku);
                  
                  return (
                    <div
                      key={store.id}
                      className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 ${
                        selectedStore?.id === store.id ? 'scale-125 z-10' : ''
                      }`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 10)}%`,
                      }}
                      onClick={() => setSelectedStore(store)}
                    >
                      <div className="relative">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(status)} shadow-lg`}></div>
                        <div className={`absolute -top-1 -right-1 w-2 h-2 ${getStatusColor(status)} rounded-full animate-pulse`}></div>
                        {item && (
                          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                            Stock: {item.currentStock}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-gray-900/80 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-2">Stock Levels</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Low Stock</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Normal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Overstock</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Details Panel */}
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Store Details</h3>
            {selectedStore ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white">{selectedStore.name}</h4>
                  <p className="text-sm text-gray-400">{selectedStore.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-gray-400">Manager</span>
                    </div>
                    <p className="text-sm font-medium text-white mt-1">{selectedStore.manager}</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Total SKUs</span>
                    </div>
                    <p className="text-sm font-medium text-white mt-1">
                      {getStoreInventory(selectedStore.id)?.items.length || 0}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Current Product Stock</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  {(() => {
                    const inventory = getStoreInventory(selectedStore.id);
                    const item = inventory?.items.find(item => item.sku === selectedSku);
                    return item ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-400">Current</span>
                          <span className="text-sm font-medium text-white">{item.currentStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-400">Forecast</span>
                          <span className="text-sm font-medium text-blue-400">{item.demandForecast}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getStatusColor(getStockStatus(selectedStore.id, selectedSku))}`}
                            style={{ width: `${Math.min((item.currentStock / item.maxThreshold) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">No data available</p>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Select a store on the map to view details</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Network Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Stores</span>
                <span className="text-white font-medium">{stores.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Active Regions</span>
                <span className="text-white font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Low Stock Alerts</span>
                <span className="text-red-400 font-medium">
                  {storeInventories.reduce((sum, inv) => sum + inv.lowStockCount, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Overstock Items</span>
                <span className="text-yellow-400 font-medium">
                  {storeInventories.reduce((sum, inv) => sum + inv.overStockCount, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;