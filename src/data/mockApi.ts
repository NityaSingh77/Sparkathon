// mockApi.ts

export const fetchProducts = async () => {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 300));

  return [
    { value: 'SKU-001', label: 'iPhone 15 Pro Max', accuracy: 89 },
    { value: 'SKU-002', label: 'Samsung 65" 4K TV', accuracy: 85 },
    { value: 'SKU-003', label: 'Nike Air Max Sneakers', accuracy: 91 }
  ];
};

export const fetchStores = async () => {
  await new Promise((res) => setTimeout(res, 300));

  return [
    { value: 'store-001', label: 'Downtown Supercenter' },
    { value: 'store-002', label: 'Uptown Neighborhood' },
    { value: 'store-003', label: 'Suburbs Supercenter' }
  ];
};

// Simulate forecast data; can customize based on selected product/store/range if you want
export const fetchForecastData = async (
  productValue: string,
  storeValue: string,
  forecastRange: number
) => {
  await new Promise((res) => setTimeout(res, 500));

  // Example data generation for the forecastRange
  const baseDate = new Date('2024-01-15');
  const data = [];
  for (let i = 0; i < forecastRange; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];

    // Just example logic for actual and predicted values
    const predicted = 20 + i * 2 + (productValue.charCodeAt(4) % 5); // pseudo-random variation
    const actual = i < forecastRange - 3 ? predicted + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5) : null;
    const confidence = 80 + Math.floor(Math.random() * 15);

    data.push({ date: dateStr, actual, predicted, confidence });
  }

  return data;
};

export const fetchFactors = async () => {
  await new Promise((res) => setTimeout(res, 300));

  return [
    { factor: 'Historical Sales', impact: 35, trend: 'positive' },
    { factor: 'Seasonal Patterns', impact: 28, trend: 'positive' },
    { factor: 'Local Events', impact: 15, trend: 'neutral' },
    { factor: 'Weather', impact: 12, trend: 'negative' },
    { factor: 'Promotions', impact: 8, trend: 'positive' },
    { factor: 'Competitor Activity', impact: 2, trend: 'negative' }
  ];
};
