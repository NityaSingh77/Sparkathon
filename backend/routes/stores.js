import express from 'express';
import { storesData } from '../data/stores.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(storesData);
});

export default router;
