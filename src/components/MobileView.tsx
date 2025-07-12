// SustainabilityInsights.tsx
import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

// Define precise store locations
type RegionKey =
  | 'Walmart Supercenter - Austin'
  | 'Walmart - Houston Heights'
  | 'Walmart - El Paso Westgate'
  | 'Walmart - Plano Park Blvd';

// Store metadata
const storeMeta: Record<RegionKey, { city: string; storeId: string }> = {
  'Walmart Supercenter - Austin': { city: 'Austin, TX', storeId: '4563' },
  'Walmart - Houston Heights': { city: 'Houston, TX', storeId: '3921' },
  'Walmart - El Paso Westgate': { city: 'El Paso, TX', storeId: '2230' },
  'Walmart - Plano Park Blvd': { city: 'Plano, TX', storeId: '3012' },
};

// ESG badge data
const regionBadges: Record<RegionKey, string[]> = {
  'Walmart Supercenter - Austin': ['Low Impact Store'],
  'Walmart - Houston Heights': ['ESG Verified Region'],
  'Walmart - El Paso Westgate': [],
  'Walmart - Plano Park Blvd': ['ESG Verified Region', 'Low Impact Store'],
};

// Weather-based logic
const mockWeatherData: Record<RegionKey, { season: string; avgTempC: number }> = {
  'Walmart Supercenter - Austin': { season: 'summer', avgTempC: 35 },
  'Walmart - Houston Heights': { season: 'summer', avgTempC: 33 },
  'Walmart - El Paso Westgate': { season: 'fall', avgTempC: 21 },
  'Walmart - Plano Park Blvd': { season: 'spring', avgTempC: 28 },
};

const adjustForWeather = (co2: number, region: RegionKey) => {
  const weather = mockWeatherData[region];
  if (weather.season === 'summer' && weather.avgTempC > 30) {
    return Math.round(co2 * 1.15);
  }
  return co2;
};

// Product footprints
const mockProductFootprints = [
  { productId: 'p001', name: 'Organic Apples', co2PerUnit: 0.4, energyPerUnit: 0.2, wastePerUnit: 0.1 },
  { productId: 'p002', name: 'Almond Milk', co2PerUnit: 1.1, energyPerUnit: 0.8, wastePerUnit: 0.05 },
  { productId: 'p003', name: 'Winter Jacket', co2PerUnit: 10, energyPerUnit: 5, wastePerUnit: 2 },
];

const SustainabilityInsights: React.FC = () => {
  const [regionalImpact, setRegionalImpact] = useState<
    { region: RegionKey; co2: number; waste: number; tempC?: number }[]
  >([
    { region: 'Walmart Supercenter - Austin', co2: 390, waste: 210 },
    { region: 'Walmart - Houston Heights', co2: 340, waste: 180 },
    { region: 'Walmart - El Paso Westgate', co2: 310, waste: 160 },
    { region: 'Walmart - Plano Park Blvd', co2: 295, waste: 175 },
  ]);

  useEffect(() => {
  console.log('API Key (from env):', import.meta.env.VITE_WEATHER_API_KEY);
  const fetchWeatherAndAdjust = async () => {
    const updated = await Promise.all(
      regionalImpact.map(async (store) => {
        const city = storeMeta[store.region].city.split(',')[0]; // get 'Austin' from 'Austin, TX'
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
          );
          const data = await res.json();
          const temp = data?.main?.temp;

          const adjustedCo2 =
            temp && temp > 30 ? Math.round(store.co2 * 1.15) : store.co2;

          return {
            ...store,
            co2: adjustedCo2,
            tempC: temp,
          };
        } catch (err) {
          console.error(`Weather fetch failed for ${city}:`, err);
          return store; // fallback to original
        }
      })
    );

    setRegionalImpact(updated);
  };

  fetchWeatherAndAdjust();
}, []);


  const metrics = {
    co2Reduced: regionalImpact.reduce((acc, r) => acc + r.co2, 0),
    energySaved: 4400,
    wasteDiverted: regionalImpact.reduce((acc, r) => acc + r.waste, 0),
    redistributedPercent: 82,
  };

  const recommendations = [
    'Route surplus perishables from Austin to surrounding rural stores.',
    'Consider markdown or donation for stagnant apparel in El Paso.',
    'Apply bulk savings incentives in Plano to reduce package waste.',
    'Optimize refrigeration cycles in Houston Heights during peak load.',
    'Use EV trucks for nightly redistribution between Plano and Austin.',
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
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

      {/* Regional Impact */}
      <div className="bg-[#043980] shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-white">Regional Environmental Impact</h2>
        <div className="space-y-4 text-[18px]">
          {regionalImpact.map((region, index) => {
            const meta = storeMeta[region.region];
            return (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-100" size={16} />
                  <div>
                    <div className="font-medium text-gray-100">
                      {region.region}
                      <span className="text-xs text-gray-400 ml-2">(#{meta.storeId}, {meta.city})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {regionBadges[region.region]?.map((badge, i) => (
                        <span
                          key={i}
                          className="inline-block bg-green-200 text-green-800 text-xs px-2 py-0.5 rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-200">
                  CO₂: <b>{region.co2} kg</b> | Waste Diverted: <b>{region.waste}</b> | Temp: <b>{region.tempC ? `${region.tempC}°C` : 'N/A'}</b>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Product Footprints */}
        <h2 className="text-lg font-semibold text-black">Product Environmental Footprints</h2>
        <div className="overflow-hidden shadow rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-[#043980] text-white test-lg">
              <th className="border border-gray-300 px-3 py-1">Product</th>
              <th className="border border-gray-300 px-3 py-1">CO₂ per Unit (kg)</th>
              <th className="border border-gray-300 px-3 py-1">Energy per Unit (kWh)</th>
              <th className="border border-gray-300 px-3 py-1">Waste per Unit (units)</th>
            </tr>
          </thead>
          <tbody>
            {mockProductFootprints.map((p) => (
              <tr key={p.productId}>
                <td className="border border-gray-400 px-3 py-1 text-black bg-[#043980]/10">{p.name}</td>
                <td className="border border-gray-400 px-3 py-1 text-black bg-[#043980]/10">{p.co2PerUnit}</td>
                <td className="border border-gray-400 px-3 py-1 text-black bg-[#043980]/10">{p.energyPerUnit}</td>
                <td className="border border-gray-400 px-3 py-1 text-black bg-[#043980]/10">{p.wastePerUnit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-[#043980]/10 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-black">Green Recommendations</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SustainabilityInsights;
console.log('API Key:', import.meta.env.VITE_WEATHER_API_KEY);

