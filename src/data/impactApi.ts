// src/api/impactApi.ts

// Simulate delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated dynamic metric data
export const fetchImpactMetrics = async () => {
  await wait(500); // simulate network delay
  return {
    totalSavings: 175000,
    co2Reduced: 12800,
    stockoutsAvoided: 412,
    forecastAccuracy: 0.91,
    transfersCompleted: 821,
    transfersApproved: 801,
    averageDistance: 18.7,
  };
};

export const fetchSavingsData = async (range: string) => {
  await wait(300);

  const base = [
    { month: 'Oct', savings: 38400 },
    { month: 'Nov', savings: 42100 },
    { month: 'Dec', savings: 45600 },
    { month: 'Jan', savings: 48200 }
  ];

  if (range === 'Monthly') {
    return base.slice(-1); // Jan
  } else if (range === 'Yearly') {
    return [...base, { month: 'Feb', savings: 50000 }, { month: 'Mar', savings: 52000 }];
  }

  return base; // Quarterly
};

export const fetchEfficiencyData = async () => {
  await wait(300);
  return [
    { category: 'Transportation', value: 35, color: '#3B82F6' },
    { category: 'Storage', value: 28, color: '#10B981' },
    { category: 'Stockouts', value: 22, color: '#F59E0B' },
    { category: 'Waste Reduction', value: 15, color: '#EF4444' }
  ];
};

export const fetchPerformanceData = async (range: string) => {
  await wait(300);

  const data = [
    { week: 'Week 1', accuracy: 87, approved: 94 },
    { week: 'Week 2', accuracy: 89, approved: 92 },
    { week: 'Week 3', accuracy: 91, approved: 89 },
    { week: 'Week 4', accuracy: 89, approved: 95 },
  ];

  return data;
};
