// SustainabilityInsights.tsx
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

// Mock environmental footprints (could come from CSV/JSON API)
const mockProductFootprints = [
  { productId: 'p001', name: 'Organic Apples', co2PerUnit: 0.4, energyPerUnit: 0.2, wastePerUnit: 0.1 },
  { productId: 'p002', name: 'Almond Milk', co2PerUnit: 1.1, energyPerUnit: 0.8, wastePerUnit: 0.05 },
  { productId: 'p003', name: 'Winter Jacket', co2PerUnit: 10, energyPerUnit: 5, wastePerUnit: 2 },
];

// Mock weather data by region (simplified)
const mockWeatherData = {
  'North Texas': { season: 'summer', avgTempC: 34 },
  'South Texas': { season: 'summer', avgTempC: 36 },
  'Central Texas': { season: 'spring', avgTempC: 25 },
  'West Texas': { season: 'fall', avgTempC: 18 },
};

// ESG badge conditions (mock)
type RegionKey = 'North Texas' | 'South Texas' | 'Central Texas' | 'West Texas';
const regionBadges: Record<RegionKey, string[]> = {
  'North Texas': ['ESG Verified Region', 'Low Impact Store'],
  'South Texas': ['ESG Verified Region'],
  'Central Texas': ['Low Impact Store'],
  'West Texas': [],
};

// Adjust CO2 emissions based on weather logic (e.g., refrigeration increases in summer)
const adjustForWeather = (co2: number, region: RegionKey) => {
  const weather = mockWeatherData[region];
  if (!weather) return co2;

  // If summer and avgTempC > 30, increase CO2 by 15% due to extra refrigeration
  if (weather.season === 'summer' && weather.avgTempC > 30) {
    return Math.round(co2 * 1.15);
  }
  return co2;
};

const SustainabilityInsights: React.FC = () => {
  const [regionalImpact, setRegionalImpact] = useState<{ region: RegionKey; co2: number; waste: number; }[]>([
    { region: 'North Texas', co2: 420, waste: 200 },
    { region: 'South Texas', co2: 280, waste: 160 },
    { region: 'Central Texas', co2: 310, waste: 230 },
    { region: 'West Texas', co2: 310, waste: 190 },
  ]);

  // Adjust regional CO2 emissions based on weather when component mounts
  useEffect(() => {
    const adjusted = regionalImpact.map((region) => ({
      ...region,
      co2: adjustForWeather(region.co2, region.region),
    }));
    setRegionalImpact(adjusted);
  }, []);

  const metrics = {
    co2Reduced: regionalImpact.reduce((acc, r) => acc + r.co2, 0),
    energySaved: 4400,
    wasteDiverted: regionalImpact.reduce((acc, r) => acc + r.waste, 0),
    redistributedPercent: 82,
  };

  const recommendations = [
    'Route surplus perishables from Uptown to Eastside — expiring soon.',
    'Flag slow-moving winter apparel in El Paso for donation or discount.',
    'Promote bulk purchase incentives in Downtown Dallas to reduce overstock.',
    'Optimize cooling loads in Suburbs store — energy spike projected.',
    'Explore EV truck routing between Houston & Austin for redistribution.',
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Sustainability Insights</h1>
        <p className="text-gray-600">
          Measuring the environmental impact of smarter inventory decisions — carbon reduction, waste prevention, and green operations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-green-700 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">CO₂ Emissions Avoided</div>
          <div className="mt-2 text-3xl font-bold">{metrics.co2Reduced} kg</div>
        </div>
        <div className="bg-blue-700 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Energy Saved</div>
          <div className="mt-2 text-3xl font-bold">{metrics.energySaved} kWh</div>
        </div>
        <div className="bg-yellow-600 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Units Diverted from Waste</div>
          <div className="mt-2 text-3xl font-bold">{metrics.wasteDiverted}</div>
        </div>
        <div className="bg-emerald-600 text-white rounded-lg p-6 shadow">
          <div className="text-sm uppercase">Redistribution Efficiency</div>
          <div className="mt-2 text-3xl font-bold">{metrics.redistributedPercent}%</div>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Regional Environmental Impact</h2>
        <div className="space-y-4">
          {regionalImpact.map((region, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-600" size={16} />
                <span className="font-medium text-gray-800">{region.region}</span>
                {regionBadges[region.region]?.map((badge: string, i: number) => (
                  <span
                    key={i}
                    className="ml-2 inline-block bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                CO₂: <b>{region.co2} kg</b> | Waste Diverted: <b>{region.waste}</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Green Recommendations</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* Optional: Display product footprints */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Sample Product Environmental Footprints</h2>
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-1">Product</th>
              <th className="border border-gray-300 px-3 py-1">CO₂ per Unit (kg)</th>
              <th className="border border-gray-300 px-3 py-1">Energy per Unit (kWh)</th>
              <th className="border border-gray-300 px-3 py-1">Waste per Unit (units)</th>
            </tr>
          </thead>
          <tbody>
            {mockProductFootprints.map((p) => (
              <tr key={p.productId}>
                <td className="border border-gray-300 px-3 py-1">{p.name}</td>
                <td className="border border-gray-300 px-3 py-1">{p.co2PerUnit}</td>
                <td className="border border-gray-300 px-3 py-1">{p.energyPerUnit}</td>
                <td className="border border-gray-300 px-3 py-1">{p.wastePerUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SustainabilityInsights;
