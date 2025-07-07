const express = require('express');
const router = express.Router();
const storesData = require('../data/stores');  // Replace with real DB later

router.get('/', (req, res) => {
  res.json(storesData);
});

module.exports = router;
