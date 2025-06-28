import React, { useState } from 'react';
import { Bell, Package, MapPin, CheckCircle, AlertTriangle, Smartphone } from 'lucide-react';
import { transferSuggestions, stores } from '../data/mockData';

const MobileView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'transfers' | 'inventory'>('notifications');

  const getStoreName = (storeId: string) => {
    return stores.find(store => store.id === storeId)?.name || 'Unknown Store';
  };

  const urgentTransfers = transferSuggestions.filter(t => t.urgency === 'critical' || t.urgency === 'high');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Mobile Store Manager</h2>
          <p className="text-gray-400">Optimized interface for store managers on-the-go</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Smartphone className="w-4 h-4" />
          <span>PWA Ready</span>
        </div>
      </div>

      {/* Mobile Simulator */}
      <div className="max-w-sm mx-auto">
        <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl border border-gray-700">
          {/* Phone Header */}
          <div className="bg-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center py-2 bg-gray-700">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>
            
            {/* App Header */}
            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                    <Package className="w-3 h-3" />
                  </div>
                  <span className="text-white font-medium text-sm">AI Inventory</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-gray-700">
              {[
                { id: 'notifications', label: 'Alerts', icon: Bell },
                { id: 'transfers', label: 'Transfers', icon: Package },
                { id: 'inventory', label: 'Stock', icon: MapPin }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex flex-col items-center py-2 px-1 text-xs transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Area */}
            <div className="h-96 overflow-y-auto bg-gray-800">
              {activeTab === 'notifications' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium text-sm">Priority Alerts</h3>
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {urgentTransfers.length}
                    </span>
                  </div>
                  
                  {urgentTransfers.slice(0, 4).map((transfer) => (
                    <div key={transfer.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-medium truncate">
                            {transfer.productName}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Transfer needed: {transfer.quantity} units
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {getStoreName(transfer.fromStoreId)} → {getStoreName(transfer.toStoreId)}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          transfer.urgency === 'critical' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white'
                        }`}>
                          {transfer.urgency}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-2">
                    <button className="text-blue-400 text-xs hover:text-blue-300">
                      View All Alerts
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'transfers' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium text-sm">Pending Approvals</h3>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {transferSuggestions.length}
                    </span>
                  </div>
                  
                  {transferSuggestions.slice(0, 3).map((transfer) => (
                    <div key={transfer.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-white text-xs font-medium">{transfer.productName}</p>
                          <span className="text-green-400 text-xs font-medium">
                            ${transfer.estimatedSavings.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          {transfer.quantity} units • {transfer.distance} mi
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-green-600 text-white text-xs py-2 rounded-md hover:bg-green-700 transition-colors">
                            Approve
                          </button>
                          <button className="flex-1 bg-gray-600 text-white text-xs py-2 rounded-md hover:bg-gray-700 transition-colors">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center pt-2">
                    <button className="text-blue-400 text-xs hover:text-blue-300">
                      View All Transfers
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-medium text-sm">Stock Status</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-400">Live</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-600 rounded-lg p-3 text-center">
                      <p className="text-white text-lg font-bold">342</p>
                      <p className="text-green-100 text-xs">In Stock</p>
                    </div>
                    <div className="bg-red-600 rounded-lg p-3 text-center">
                      <p className="text-white text-lg font-bold">23</p>
                      <p className="text-red-100 text-xs">Low Stock</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-400 text-xs font-medium">Critical Items</p>
                    
                    {['iPhone 15 Pro Max', 'Samsung 65" TV', 'Nike Air Max'].map((item, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <p className="text-white text-xs font-medium">{item}</p>
                          <p className="text-gray-400 text-xs">Stock: {12 - index * 3}</p>
                        </div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center pt-2">
                    <button className="text-blue-400 text-xs hover:text-blue-300">
                      Full Inventory
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Indicator */}
            <div className="bg-gray-700 px-4 py-2 text-center">
              <div className="w-8 h-1 bg-gray-600 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* PWA Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-white font-medium mb-2">Offline Support</h3>
          <p className="text-gray-400 text-sm">Works without internet connection and syncs when back online</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-white font-medium mb-2">Push Notifications</h3>
          <p className="text-gray-400 text-sm">Real-time alerts for critical inventory situations</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-white font-medium mb-2">Quick Actions</h3>
          <p className="text-gray-400 text-sm">One-tap approval and inventory management</p>
        </div>
      </div>
    </div>
  );
};

export default MobileView;