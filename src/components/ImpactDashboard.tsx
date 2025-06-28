import React from 'react';
import { TrendingUp, DollarSign, Leaf, Package, Target, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { impactMetrics } from '../data/mockData';

const ImpactDashboard: React.FC = () => {
  const savingsData = [
    { month: 'Oct', savings: 38400, transfers: 142 },
    { month: 'Nov', savings: 42100, transfers: 156 },
    { month: 'Dec', savings: 45600, transfers: 189 },
    { month: 'Jan', savings: 48200, transfers: 203 },
  ];

  const efficiencyData = [
    { category: 'Transportation', value: 35, color: '#3B82F6' },
    { category: 'Storage', value: 28, color: '#10B981' },
    { category: 'Stockouts', value: 22, color: '#F59E0B' },
    { category: 'Waste Reduction', value: 15, color: '#EF4444' }
  ];

  const performanceData = [
    { week: 'Week 1', accuracy: 87, approved: 94 },
    { week: 'Week 2', accuracy: 89, approved: 92 },
    { week: 'Week 3', accuracy: 91, approved: 89 },
    { week: 'Week 4', accuracy: 89, approved: 95 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Impact Dashboard</h2>
        <p className="text-gray-400">Real-time metrics showing the business impact of AI-driven redistribution</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-green-200 text-sm">+12% from last month</span>
          </div>
          <p className="text-3xl font-bold mb-1">${impactMetrics.totalSavings.toLocaleString()}</p>
          <p className="text-green-100">Total Cost Savings</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-blue-200 text-sm">-8% emissions</span>
          </div>
          <p className="text-3xl font-bold mb-1">{impactMetrics.co2Reduced.toLocaleString()}</p>
          <p className="text-blue-100">CO₂ Reduced (lbs)</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-purple-200 text-sm">97% success rate</span>
          </div>
          <p className="text-3xl font-bold mb-1">{impactMetrics.stockoutsAvoided}</p>
          <p className="text-purple-100">Stockouts Avoided</p>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-amber-200 text-sm">+3% this month</span>
          </div>
          <p className="text-3xl font-bold mb-1">{(impactMetrics.forecastAccuracy * 100).toFixed(0)}%</p>
          <p className="text-amber-100">Forecast Accuracy</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Savings Trend */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Cost Savings Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Savings']}
                />
                <Bar dataKey="savings" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Breakdown */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Efficiency Breakdown</h3>
          <div className="h-80 flex items-center">
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={efficiencyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value) => [`${value}%`, 'Impact']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {efficiencyData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.category}</p>
                    <p className="text-xs text-gray-400">{item.value}% impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">System Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Forecast Accuracy %"
              />
              <Line 
                type="monotone" 
                dataKey="approved" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Approval Rate %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Transfers Completed</span>
          </div>
          <p className="text-xl font-bold text-white">{impactMetrics.transfersCompleted}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Approval Rate</span>
          </div>
          <p className="text-xl font-bold text-white">
            {((impactMetrics.transfersApproved / (impactMetrics.transfersApproved + 20)) * 100).toFixed(0)}%
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Avg Distance</span>
          </div>
          <p className="text-xl font-bold text-white">{impactMetrics.averageDistance} mi</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-400">ROI</span>
          </div>
          <p className="text-xl font-bold text-white">284%</p>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;