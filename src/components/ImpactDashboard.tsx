import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Leaf,
  Package,
  Target,
  CheckCircle,
  Download,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { impactMetrics } from '../data/mockData';

const ImpactDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('Quarterly');

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

  const handleDownload = () => {
    // Implement export to CSV or PDF functionality here
    alert("Download initiated...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Impact Dashboard</h2>
          <p className="text-gray-400">Real-time metrics showing the business impact of AI-driven redistribution</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <select
            className="bg-gray-700 text-white p-2 rounded-lg text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Savings */}
        <MetricCard
          icon={<DollarSign className="w-6 h-6" />}
          change="+12%"
          isPositive
          value={`$${impactMetrics.totalSavings.toLocaleString()}`}
          label="Total Cost Savings"
          gradient="from-green-600 to-green-700"
        />

        {/* CO2 Reduction */}
        <MetricCard
          icon={<Leaf className="w-6 h-6" />}
          change="-8%"
          isPositive={false}
          value={`${impactMetrics.co2Reduced.toLocaleString()}`}
          label="CO₂ Reduced (lbs)"
          gradient="from-blue-600 to-blue-700"
        />

        {/* Stockouts Avoided */}
        <MetricCard
          icon={<Package className="w-6 h-6" />}
          change="97% success rate"
          isPositive
          value={impactMetrics.stockoutsAvoided}
          label="Stockouts Avoided"
          gradient="from-purple-600 to-purple-700"
        />

        {/* Forecast Accuracy */}
        <MetricCard
          icon={<Target className="w-6 h-6" />}
          change="+3% this month"
          isPositive
          value={`${(impactMetrics.forecastAccuracy * 100).toFixed(0)}%`}
          label="Forecast Accuracy"
          gradient="from-amber-600 to-amber-700"
        />
      </div>

      {/* Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Savings Trend */}
        <ChartCard title="Cost Savings Trend">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <RechartsTooltip
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
        </ChartCard>

        {/* Efficiency Breakdown */}
        <ChartCard title="Efficiency Breakdown">
          <div className="flex items-center h-80">
            <div className="w-1/2 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={efficiencyData}
                    cx="50%" cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
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
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-sm text-white">{item.category}</p>
                    <p className="text-xs text-gray-400">{item.value}% impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Performance Metrics */}
      <ChartCard title="System Performance">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="week" stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
            <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
            <RechartsTooltip
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
      </ChartCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat icon={<CheckCircle className="w-4 h-4 text-green-400" />} label="Transfers Completed" value={impactMetrics.transfersCompleted} />
        <QuickStat icon={<TrendingUp className="w-4 h-4 text-blue-400" />} label="Approval Rate" value={`${((impactMetrics.transfersApproved / (impactMetrics.transfersApproved + 20)) * 100).toFixed(0)}%`} />
        <QuickStat icon={<Package className="w-4 h-4 text-purple-400" />} label="Avg Distance" value={`${impactMetrics.averageDistance} mi`} />
        <QuickStat icon={<Target className="w-4 h-4 text-amber-400" />} label="ROI" value="284%" />
      </div>
    </div>
  );
};

// Reusable Components
type MetricCardProps = {
  icon: React.ReactNode;
  change: string;
  value: string | number;
  label: string;
  gradient: string;
  isPositive?: boolean;
};

const MetricCard: React.FC<MetricCardProps> = ({ icon, change, value, label, gradient, isPositive = true }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white`}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">{icon}</div>
      <span className={`text-sm ${isPositive ? 'text-green-200' : 'text-red-200'} flex items-center space-x-1`}>
        {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        <span>{change}</span>
      </span>
    </div>
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className="text-white/80">{label}</p>
  </div>
);

type ChartCardProps = {
  title: string;
  children: React.ReactNode;
};

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <div className="bg-gray-800 rounded-xl p-6">
    <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

type QuickStatProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const QuickStat: React.FC<QuickStatProps> = ({ icon, label, value }) => (
  <div className="bg-gray-800 rounded-xl p-4">
    <div className="flex items-center space-x-2 mb-2">
      {icon}
      <span className="text-sm text-gray-400">{label}</span>
    </div>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

export default ImpactDashboard;
