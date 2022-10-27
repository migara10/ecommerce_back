const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.post('/saveproduct', productController.saveProduct); // create new product


module.exports = router;