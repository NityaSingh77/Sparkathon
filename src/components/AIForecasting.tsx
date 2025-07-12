import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Calendar,
  Target,
  Activity,
  ChevronRight,
  Download
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from 'recharts';

const AIForecasting: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState('SKU-001');
  const [selectedStore, setSelectedStore] = useState('store-001');
  const [forecastRange, setForecastRange] = useState(7);

  const demandData = [
    { date: '2024-01-15', actual: 28, predicted: 25, confidence: 89 },
    { date: '2024-01-16', actual: 24, predicted: 22, confidence: 85 },
    { date: '2024-01-17', actual: 19, predicted: 18, confidence: 92 },
    { date: '2024-01-18', actual: null, predicted: 21, confidence: 87 },
    { date: '2024-01-19', actual: null, predicted: 26, confidence: 83 },
    { date: '2024-01-20', actual: null, predicted: 23, confidence: 88 },
    { date: '2024-01-21', actual: null, predicted: 29, confidence: 85 }
  ];

  const factorsData = [
    { factor: 'Historical Sales', impact: 35, trend: 'positive' },
    { factor: 'Seasonal Patterns', impact: 28, trend: 'positive' },
    { factor: 'Local Events', impact: 15, trend: 'neutral' },
    { factor: 'Weather', impact: 12, trend: 'negative' },
    { factor: 'Promotions', impact: 8, trend: 'positive' },
    { factor: 'Competitor Activity', impact: 2, trend: 'negative' }
  ];

  const products = [
    { value: 'SKU-001', label: 'iPhone 15 Pro Max', accuracy: 89 },
    { value: 'SKU-002', label: 'Samsung 65" 4K TV', accuracy: 85 },
    { value: 'SKU-003', label: 'Nike Air Max Sneakers', accuracy: 91 },
    { value: 'SKU-004', label: 'Sony Noise Cancelling Headphones', accuracy: 80 },
    { value: 'SKU-005', label: 'Fitbit Charge 6', accuracy: 67 },
    { value: 'SKU-006', label: 'GoPro Hero 12', accuracy: 87 },
    { value: 'SKU-005', label: 'Apple Watch Series 9', accuracy: 86 },
    { value: 'SKU-006', label: 'Canon EOS R6 Camera', accuracy: 84 },
    { value: 'SKU-006', label: 'KitchenAid Stand Mixer', accuracy: 84 }
  ];

  const stores = [
    { value: 'store-001', label: 'Downtown Supercenter' },
    { value: 'store-002', label: 'Uptown Neighborhood' },
    { value: 'store-003', label: 'Suburbs Supercenter' }
  ];

  const exportCSV = () => {
    const headers = ['Date', 'Actual', 'Predicted', 'Confidence'];
    const rows = demandData.map(d => [d.date, d.actual ?? '', d.predicted, d.confidence].join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forecast_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">AI Demand Forecasting</h2>
          <p className="text-gray-500">Machine learning predictions based on multi-factor analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="bg-gray-100 border-2 border-gray-700 text-black px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#043980]"
          >
            {products.map(product => (
              <option key={product.value} value={product.value}>{product.label}</option>
            ))}
          </select>
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
            className="bg-gray-100 border-2 border-gray-700 text-black px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#043980]"
          >
            {stores.map(store => (
              <option key={store.value} value={store.value}>{store.label}</option>
            ))}
          </select>
          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 border-2 border-black bg-gray-100 px-4 py-2 rounded-full text-black hover:bg-[#043980] hover:text-white transition ease-in-out duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Forecast Range Selector */}
      <div className="flex space-x-2">
        {[7, 14, 30].map((range) => (
          <button
            key={range}
            onClick={() => setForecastRange(range)}
            className={`px-3 py-2 rounded-full font-medium ${
              forecastRange === range
                ? 'bg-[#043980] text-white'
                : 'bg-gray-100 text-black border border-gray-600'
            }`}
          >
            {range}-Day
          </button>
        ))}
      </div>

      {/* AI Model Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#043980] rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#043980]" />
            </div>
            <div>
              <p className="text-2xl font-bold">89%</p>
              <p className="text-sm text-gray-300">Model Accuracy</p>
            </div>
          </div>
        </div>
        <div className="bg-[#043980] rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100/80 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">247</p>
              <p className="text-sm text-gray-300">Predictions Today</p>
            </div>
          </div>
        </div>
        <div className="bg-[#043980] rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100/80 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-300">Data Sources</p>
            </div>
          </div>
        </div>
        <div className="bg-[#043980] rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100/80 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-700" />
            </div>
            <div>
              <p className="text-2xl font-bold">{forecastRange}</p>
              <p className="text-sm text-gray-300">Days Forecast</p>
            </div>
          </div>
        </div>
      </div>

      {/* Demand Chart + Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2 bg-[#043980] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Demand Forecast ({forecastRange}-Day)</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full" />
                <span className="text-gray-200">Predicted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <span className="text-gray-200">Actual</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E3A8A" />
                <XAxis
                  dataKey="date"
                  stroke="#BFDBFE"
                  tick={{ fill: '#BFDBFE' }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  }
                />
                <YAxis stroke="#BFDBFE" tick={{ fill: '#BFDBFE' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E3A8A',
                    border: '1px solid #93C5FD',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="none"
                  fill="rgba(147, 197, 253, 0.2)"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#60A5FA"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#34D399"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Factors */}
        <div className="bg-[#043980] rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-6">Demand Factors</h3>
          <div className="space-y-4">
            {factorsData.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{factor.factor}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{factor.impact}%</span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        factor.trend === 'positive'
                          ? 'bg-green-400'
                          : factor.trend === 'negative'
                          ? 'bg-red-400'
                          : 'bg-gray-300'
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${factor.impact}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-sm font-medium">Key Insights</span>
            </div>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Historical sales show 15% uptick this week</li>
              <li>• Local tech conference driving demand</li>
              <li>• Competitor out of stock until Friday</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="bg-[#043980] rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-6">Model Performance Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.value} className="bg-blue-900/40 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-sm">{product.label}</h4>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="font-medium">{product.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="h-2 bg-green-400 rounded-full"
                    style={{ width: `${product.accuracy}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Last 30 days</span>
                  <span
                    className={`${
                      product.accuracy > 85 ? 'text-green-300' : 'text-yellow-300'
                    }`}
                  >
                    {product.accuracy > 85 ? 'Excellent' : 'Good'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIForecasting;
