const express = require('express');
const router = express.Router();

const productRoutes = require('./vendorProducts');
const orderRoutes = require('./vendorOrders');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
