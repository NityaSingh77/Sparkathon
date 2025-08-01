import React, { useState } from 'react';
import { MapPin, Package, AlertTriangle, Users } from 'lucide-react';
import { stores, storeInventories } from '../data/mockData';
import { Store } from '../types';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const MapAutoZoom: React.FC<{ lat: number, lng: number }> = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], 12, { duration: 1.5 });
  }, [lat, lng, map]);

  return null;
};
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
      case 'low': return 'red';
      case 'high': return '[#e0b61b]';
      case 'normal': return 'green';
      default: return 'gray';
    }
  };
  type Suggestion = {
  fromStore: Store;
  toStore: Store;
  sku: string;
  suggestedQty: number;
  distance: number; // Placeholder, you can compute real distance later
};

const getSuggestions = (): Suggestion[] => {
  const donors = stores.filter(store => getStockStatus(store.id, selectedSku) === 'high');
  const recipients = stores.filter(store => getStockStatus(store.id, selectedSku) === 'low');

  const suggestions: Suggestion[] = [];

  donors.forEach(donor => {
    recipients.forEach(recipient => {
      const donorInv = getStoreInventory(donor.id);
      const recipientInv = getStoreInventory(recipient.id);

      const donorItem = donorInv?.items.find(item => item.sku === selectedSku);
      const recipientItem = recipientInv?.items.find(item => item.sku === selectedSku);

      if (donorItem && recipientItem) {
        const surplus = donorItem.currentStock - donorItem.maxThreshold;
        const needed = recipientItem.minThreshold - recipientItem.currentStock;

        if (surplus > 0 && needed > 0) {
          suggestions.push({
            fromStore: donor,
            toStore: recipient,
            sku: selectedSku,
            suggestedQty: Math.min(surplus, needed),
            distance: 0 // Optional: Calculate real distance if needed
          });
        }
      }
    });
  });

  return suggestions;
};


  const skuOptions = [
    { value: 'SKU-001', label: 'iPhone 15 Pro Max' },
    { value: 'SKU-002', label: 'Samsung 65\" 4K TV' },
    { value: 'SKU-003', label: 'Nike Air Max Sneakers' },
  ];

  return (
    <div className="space-y-6 font-inter">
      {/* Header & Product Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Store Network Map</h2>
          <p className="text-gray-500">Real-time inventory visualization across all locations</p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-700">Product :</label>
          <select
            value={selectedSku}
            onChange={(e) => setSelectedSku(e.target.value)}
            className="bg-black text-white px-4 py-2 rounded-full focus:ring-2 focus:ring-[#043980]"
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
          {/* MAP block with fixed height */}
<div className="bg-[#043980] rounded-xl p-6 h-96 relative overflow-hidden">
  <MapContainer
    center={[32.7767, -96.7970]}
    zoom={8}
    style={{ height: '100%', width: '100%', zIndex: 0, borderRadius: '0.75rem' }}
    className="h-full w-full z-0 rounded-xl"
  >
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {stores.map((store) => {
      const status = getStockStatus(store.id, selectedSku);
      const inventory = getStoreInventory(store.id);
      const item = inventory?.items.find(item => item.sku === selectedSku);
      const color = status === 'low' ? 'red' : status === 'high' ? '#e0b61b' : status === 'normal' ? 'green' : 'gray';

      return (
        <CircleMarker
          key={store.id}
          center={[store.lat, store.lng]}
          pathOptions={{ color }}
          radius={10}
          eventHandlers={{ click: () => setSelectedStore(store) }}
        >
          <Popup>
            <div className="text-sm">
              <strong>{store.name}</strong><br />
              {store.address}<br />
              Stock: {item?.currentStock ?? 'N/A'}
            </div>
          </Popup>
        </CircleMarker>
      );
    })}
    {selectedStore && (
      <MapAutoZoom lat={selectedStore.lat} lng={selectedStore.lng} />
    )}
  </MapContainer>

  {/* Legend */}
  <div className="absolute bottom-8 left-8 bg-gray-100/80 rounded-lg p-3 border-2 border-[#043980]">
    <div className="text-xs text-black mb-2">Stock Levels</div>
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Low Stock</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Normal</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Overstock</span>
      </div>
    </div>
  </div>
</div>

{/* REDISTRIBUTION Suggestions below the map */}
<div className="bg-[#043980] rounded-xl p-6 mt-4">
  <h3 className="text-lg font-semibold text-white mb-4">Redistribution Suggestions</h3>
  {getSuggestions().length > 0 ? (
    <div className="space-y-3 max-h-48 overflow-y-auto">
      {getSuggestions().map((sug, idx) => (
        <div key={idx} className="bg-gray-100/80 rounded-lg p-3 text-sm text-gray-300">
          <p><span className="text-black"><b>{sug.suggestedQty} units</b> of </span><span className="text-blue-800">{sug.sku}</span></p>
          <p className="text-black">From: <span className="text-yellow-600"><b>{sug.fromStore.name}</b></span></p>
          <p className="text-black">To: <span className="text-red-700"><b>{sug.toStore.name}</b></span></p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400">No redistribution needed for this product.</p>
  )}
</div>
        </div>
        
        {/* Store Details Panel */}
        <div className="space-y-4">
          <div className="bg-[#043980] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Store Details</h3>
            {selectedStore ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white">{selectedStore.name}</h4>
                  <p className="text-sm text-gray-300">{selectedStore.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-100/80 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-700">Manager</span>
                    </div>
                    <p className="text-sm font-medium text-black mt-1">{selectedStore.manager}</p>
                  </div>

                  <div className="bg-gray-100/80 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-700">Total SKUs</span>
                    </div>
                    <p className="text-sm font-medium text-black mt-1">
                      {getStoreInventory(selectedStore.id)?.items.length || 0}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100/80 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-900">Current Product Stock</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </div>
                  {(() => {
                    const inventory = getStoreInventory(selectedStore.id);
                    const item = inventory?.items.find(item => item.sku === selectedSku);
                    return item ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-800">Current</span>
                          <span className="text-sm font-medium text-black">{item.currentStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-800">Forecast</span>
                          <span className="text-sm font-medium text-blue-600">{item.demandForecast}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getStatusColor(getStockStatus(selectedStore.id, selectedSku))}`}
                            style={{ width: `${Math.min((item.currentStock / item.maxThreshold) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-300">No data available</p>
                    );
                  })()}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-gray-100 mx-auto mb-3" />
                <p className="text-gray-300">Select a store on the map to view details</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-[#043980] rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Network Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Total Stores</span>
                <span className="text-white font-medium">{stores.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Active Regions</span>
                <span className="text-white font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Low Stock Alerts</span>
                <span className="text-red-400 font-medium">
                  {storeInventories.reduce((sum, inv) => sum + inv.lowStockCount, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Overstock Items</span>
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