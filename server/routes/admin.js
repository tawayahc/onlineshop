const express = require('express');
const router = express.Router();
const connection = require('../db'); 

const productRoutes = require('./vendorProducts');
const orderRoutes = require('./vendorOrders');
const authRoutes = require('./vendorauth');
const customerRoutes = require('./customerManagement');

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);

module.exports = router;
