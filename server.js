// import modules
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 3000;
// let host = process.env.HOST;
const app = express();

// import routes
const product = require('./routes/products');
const item = require('./routes/items');



app.use('/product', product)


app.listen(port, () => {
    console.log(`Server is listening: ${port}`);
});