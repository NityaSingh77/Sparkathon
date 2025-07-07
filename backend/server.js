const express = require('express');
const app = express();

const storesRoutes = require('./routes/stores');
const inventoryRoutes = require('./routes/inventory');

app.use('/api/stores', storesRoutes);
app.use('/api/inventory', inventoryRoutes);

app.listen(5000, () => console.log('Server running'));
