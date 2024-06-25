const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouseController');
const productController = require('../controllers/productController');
const deliveryController = require('../controllers/deliveryController');
const routeController = require('../controllers/routeController');

router.post('/warehouses', warehouseController.createWarehouse);
router.get('/warehouses', warehouseController.getWarehouses);
router.post('/products', productController.createProduct);
router.get('/products', productController.getProducts);
router.post('/deliveries', deliveryController.createDelivery);
router.post('/routes', routeController.createRoute);

module.exports = router;
