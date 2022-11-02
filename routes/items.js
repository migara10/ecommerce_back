const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController')

router.post('/', itemController.saveItem); // save new item
router.put('/', itemController.updateProduct); // update new qty



module.exports = router;