const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/', productController.saveProduct); // create new product
router.get('/', productController.getProductById); // get product
router.put('/', productController.updateProduct); // update new qty


module.exports = router;