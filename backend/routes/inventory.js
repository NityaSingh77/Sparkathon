import express from 'express';
import { inventoryData } from '../data/inventory.js';

const router = express.Router();

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

export default router;
