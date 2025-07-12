// SurplusRescueNetwork.tsx
import React from 'react';

const SurplusRescueNetwork: React.FC = () => {
  const surplusItems = [
    {
      id: 1,
      store: 'Walmart Supercenter - Uptown',
      status: 'Overstocked',
      quantity: 120,
      sku: 'SKU-789',
      action: 'Suggest Discount',
    },
    {
      id: 2,
      store: 'Walmart Neighborhood Market - Suburbs',
      status: 'Overstocked',
      quantity: 80,
      sku: 'SKU-456',
      action: 'Route to Nearby Store',
    },
    {
      id: 3,
      store: 'Walmart Express - Downtown',
      status: 'Overstocked',
      quantity: 50,
      sku: 'SKU-123',
      action: 'Flag for E-commerce',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Surplus Rescue Network
        </h1>
        <p className="text-gray-600">
          Smart actions for stores with high overstock — suggest discounts, route to low-stock stores, and flag for e-commerce priority.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-600 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Stores Flagged</div>
          <div className="mt-2 text-3xl font-bold">3</div>
        </div>
        <div className="bg-blue-600 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Units in Overstock</div>
          <div className="mt-2 text-3xl font-bold">250</div>
        </div>
        <div className="bg-purple-600 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Actions Suggested</div>
          <div className="mt-2 text-3xl font-bold">3</div>
        </div>
      </div>

      {/* Surplus List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b text-lg font-semibold">
          Overstock Items
        </div>
        <div className="divide-y">
          {surplusItems.map((item) => (
            <div key={item.id} className="px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="flex-1">
                <div className="font-bold text-gray-800">{item.store}</div>
                <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                <div className="text-sm text-gray-500">
                  {item.status} — {item.quantity} units
                </div>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {item.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SurplusRescueNetwork;
