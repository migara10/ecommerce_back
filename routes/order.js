const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

router.get('/', orderController.getAllOrders) // get all order
router.post('/', orderController.createNewOrder) // save new order

module.exports = router;