export const inventoryData = [
  {
    storeId: 1,
    items: [
      {
        sku: "PROD001",
        name: "Product 1",
        currentStock: 50,
        minThreshold: 20,
        maxThreshold: 100
      },
      {
        sku: "PROD002", 
        name: "Product 2",
        currentStock: 15,
        minThreshold: 25,
        maxThreshold: 80
      }
    ]
  },
  {
    storeId: 2,
    items: [
      {
        sku: "PROD001",
        name: "Product 1", 
        currentStock: 120,
        minThreshold: 20,
        maxThreshold: 100
      },
      {
        sku: "PROD003",
        name: "Product 3",
        currentStock: 30,
        minThreshold: 15,
        maxThreshold: 60
      }
    ]
  },
  {
    storeId: 3,
    items: [
      {
        sku: "PROD002",
        name: "Product 2",
        currentStock: 5,
        minThreshold: 25,
        maxThreshold: 80
      },
      {
        sku: "PROD003",
        name: "Product 3",
        currentStock: 70,
        minThreshold: 15,
        maxThreshold: 60
      }
    ]
  }
]; 