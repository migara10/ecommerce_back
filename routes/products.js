const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
})


router.post('/', upload.single('file'), productController.saveProduct); // create new product
router.put('/', upload.single('file'), productController.editProduct); // edit new product
router.get('/', productController.getProducts); // get product
router.get('/:id', productController.getProductById); // get product


module.exports = router;