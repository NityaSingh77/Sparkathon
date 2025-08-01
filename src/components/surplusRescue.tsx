// SurplusRescueNetwork.tsx
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const SurplusRescueNetwork: React.FC = () => {
  const surplusItems = [
    {
      id: 1,
      store: 'Walmart Supercenter - Uptown',
      sku: 'SKU-789',
      productName: 'Organic Baby Formula',
      surplusUnits: 120,
      forecastDemand: 30,
      daysToExpire: 25,
      action: 'Suggest 20% Discount',
      reason: 'Slow moving stock & nearing expiry'
    },
    {
      id: 2,
      store: 'Walmart Neighborhood Market - Suburbs',
      sku: 'SKU-456',
      productName: 'Bluetooth Headphones',
      surplusUnits: 80,
      forecastDemand: 18,
      daysToExpire: null,
      action: 'Route to Downtown Store',
      reason: 'Nearby store has rising demand'
    },
    {
      id: 3,
      store: 'Walmart Express - Downtown',
      sku: 'SKU-123',
      productName: 'Electric Kettle',
      surplusUnits: 50,
      forecastDemand: 22,
      daysToExpire: null,
      action: 'Flag for E-commerce Boost',
      reason: 'E-commerce traffic is trending up'
    }
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Surplus Rescue Network</h1>
        <p className="text-gray-600">
          Intelligent recovery for overstocked inventory — from discounting and redistribution to digital prioritization.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-700 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Stores Affected</div>
          <div className="mt-2 text-3xl font-bold">3</div>
        </div>
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Surplus Units</div>
          <div className="mt-2 text-3xl font-bold">250</div>
        </div>
        <div className="bg-green-700 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Suggested Actions</div>
          <div className="mt-2 text-3xl font-bold">3</div>
        </div>
      </div>

      {/* Surplus Table */}
      <div className="overflow-hidden shadow rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#043980] border border-gray-400">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">Store</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">Surplus Units</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">Forecast Demand</th>
              <th className="px-8 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider border border-gray-400">Reason</th>
            </tr>
          </thead>
          <tbody className="bg-[#043980]/10 divide-y divide-gray-200">
            {surplusItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 border border-gray-400">{item.store}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border border-gray-400">{item.sku}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border border-gray-400">{item.productName}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border border-gray-400">{item.surplusUnits}</td>
                <td className="px-6 py-4 text-sm text-gray-700 border border-gray-400">{item.forecastDemand}</td>
                <td className="px-6 py-4 border border-gray-400">
                  <span className="inline-flex items-center px-6 py-1 rounded-full text-sm font-medium bg-green-100 border border-green-700 text-green-800">
                    {item.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 border border-gray-400">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurplusRescueNetwork;
