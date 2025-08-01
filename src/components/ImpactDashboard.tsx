import React, { useEffect, useState } from 'react';
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
import {
  fetchImpactMetrics,
  fetchSavingsData,
  fetchEfficiencyData,
  fetchPerformanceData
} from '../data/impactApi';

const ImpactDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('Quarterly');
  const [impactMetrics, setImpactMetrics] = useState<any>({});
  type SavingsDatum = { month: string; savings: number };
  const [savingsData, setSavingsData] = useState<SavingsDatum[]>([]);
  type EfficiencyDatum = { category: string; value: number; color: string };
  const [efficiencyData, setEfficiencyData] = useState<EfficiencyDatum[]>([]);
  type PerformanceDatum = { week: string; accuracy: number; approved: number };
  const [performanceData, setPerformanceData] = useState<PerformanceDatum[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metrics, savings, efficiency, performance] = await Promise.all([
          fetchImpactMetrics(),
          fetchSavingsData(dateRange),
          fetchEfficiencyData(),
          fetchPerformanceData(dateRange)
        ]);
        setImpactMetrics(metrics);
        setSavingsData(savings);
        setEfficiencyData(efficiency);
        setPerformanceData(performance);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      }
    };
    fetchData();
  }, [dateRange]);

  const handleDownload = () => {
    alert("Download initiated...");
  };

  return (
    <div className="space-y-6 font-inter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-black">Impact Dashboard</h2>
          <p className="text-gray-500">Real-time metrics showing the business impact of AI-driven redistribution</p>
        </div>
        <div className="flex space-x-4">
          <select
            className="bg-black border-2 border-gray-700 text-white px-4 py-2 rounded-full focus:ring-2 focus:ring-[#043980]"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 border-2 border-black bg-gray-100 px-4 py-2 rounded-full text-black hover:bg-[#043980] hover:text-white transition ease-in-out duration-300"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={<DollarSign className="w-6 h-6" />} change="+12%" isPositive value={`$${impactMetrics.totalSavings?.toLocaleString?.() || '...'}`} label="Total Cost Savings" gradient="from-green-600 to-green-700" />
        <MetricCard icon={<Leaf className="w-6 h-6" />} change="-8%" isPositive={false} value={`${impactMetrics.co2Reduced?.toLocaleString?.() || '...'}`} label="CO₂ Reduced (lbs)" gradient="from-blue-600 to-blue-700" />
        <MetricCard icon={<Package className="w-6 h-6" />} change="97% success rate" isPositive value={impactMetrics.stockoutsAvoided || '...'} label="Stockouts Avoided" gradient="from-purple-600 to-purple-700" />
        <MetricCard icon={<Target className="w-6 h-6" />} change="+3% this month" isPositive value={`${(impactMetrics.forecastAccuracy * 100 || 0).toFixed(0)}%`} label="Forecast Accuracy" gradient="from-amber-600 to-amber-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Cost Savings Trend">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFDBFE" />
              <XAxis dataKey="month" stroke="#BFDBFE" tick={{ fill: '#BFDBFE' }} />
              <YAxis stroke="#BFDBFE" tick={{ fill: '#BFDBFE' }} />
              <RechartsTooltip contentStyle={{ backgroundColor: '#BFDBFE', border: '1px solid #043980', borderRadius: '8px', color: 'black' }} formatter={(value) => [`$${value.toLocaleString()}`, 'Savings']} />
              <Bar dataKey="savings" fill="#0cb17aff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Efficiency Breakdown">
          <div className="flex items-center h-80">
            <div className="w-1/2 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={efficiencyData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                    {efficiencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#BFDBFE', border: '1px solid #043980 ', borderRadius: '8px', color: 'black' }} formatter={(value) => [`${value}%`, 'Impact']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {efficiencyData.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <div>
                    <p className="text-[18px] text-white">{item.category}</p>
                    <p className="text-sm text-gray-400">{item.value}% impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="System Performance">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BFDBFE" />
            <XAxis dataKey="week" stroke="#BFDBFE" tick={{ fill: '#BFDBFE' }} />
            <YAxis stroke="#BFDBFE" tick={{ fill: '#BFDBFE' }} />
            <RechartsTooltip contentStyle={{ backgroundColor: '#BFDBFE', border: '1px solid #043980', borderRadius: '8px', color: 'black' }} />
            <Line type="monotone" dataKey="accuracy" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} name="Forecast Accuracy %" />
            <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} name="Approval Rate %" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat icon={<CheckCircle className="w-4 h-4 text-green-400" />} label="Transfers Completed" value={impactMetrics.transfersCompleted || '...'} />
        <QuickStat icon={<TrendingUp className="w-4 h-4 text-blue-400" />} label="Approval Rate" value={`${((impactMetrics.transfersApproved / (impactMetrics.transfersApproved + 20)) * 100 || 0).toFixed(0)}%`} />
        <QuickStat icon={<Package className="w-4 h-4 text-purple-400" />} label="Avg Distance" value={`${impactMetrics.averageDistance || 0} mi`} />
        <QuickStat icon={<Target className="w-4 h-4 text-amber-400" />} label="ROI" value="284%" />
      </div>
    </div>
  );
};

export default ImpactDashboard;

// MetricCard component
interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change: string;
  isPositive?: boolean;
  gradient: string;
}
const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  change,
  isPositive = true,
  gradient,
}) => (
  <div className={`rounded-xl p-5 shadow-md bg-gradient-to-br ${gradient} flex flex-col items-start`}>
    <div className="mb-2">{icon}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-sm text-white opacity-80">{label}</div>
    <div className={`mt-2 flex items-center text-xs font-semibold ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
      {typeof change === 'string' && (change.startsWith('+') || change.startsWith('-')) && (
        isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />
      )}
      {change}
    </div>
  </div>
);

// ChartCard component
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-[#043980] rounded-xl p-6 shadow-md h-96 flex flex-col">
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    <div className="flex-1">{children}</div>
  </div>
);

// QuickStat component
interface QuickStatProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}
const QuickStat: React.FC<QuickStatProps> = ({ icon, label, value }) => (
  <div className="bg-[#043980] rounded-xl p-4 flex flex-col items-center shadow">
    <div className="mb-2">{icon}</div>
    <div className="text-xl font-bold text-white">{value}</div>
    <div className="text-xs text-gray-400">{label}</div>
  </div>
);
