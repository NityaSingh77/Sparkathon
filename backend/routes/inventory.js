const express = require('express');
const router = express.Router();
const inventoryData = require('../data/inventory');  // Replace with real DB later

router.get('/', (req, res) => {
  const { sku } = req.query;
  if (!sku) return res.status(400).json({ error: 'SKU is required' });

  const filteredInventory = inventoryData.map(inv => {
    return {
      storeId: inv.storeId,
      items: inv.items.filter(item => item.sku === sku),
      lowStockCount: inv.items.filter(item => item.sku === sku && item.currentStock < item.minThreshold).length,
      overStockCount: inv.items.filter(item => item.sku === sku && item.currentStock > item.maxThreshold).length
    };
  });

  res.json(filteredInventory);
});

module.exports = router;
