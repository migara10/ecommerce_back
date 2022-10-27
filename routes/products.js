const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/product', productController.saveProduct); // create new product
router.get('/product', productController.getProductById); // get product


module.exports = router;