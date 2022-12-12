const express = require('express');
const router = express.Router();

const authControlller = require('../controllers/authController');

router.post('/', authControlller.loginUser)



module.exports = router;