// import modules
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const port = process.env.PORT || 3000;
// let host = process.env.HOST;
const app = express();
app.use(cors());

// import routes
const product = require('./routes/products');
const item = require('./routes/items');
const order = require('./routes/order');
const auth = require('./routes/auth')


app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use('/product', product);
app.use('/item', item);
app.use('/order', order);
app.use('/auth', auth);
app.use('/upload', express.static('upload')); // get images in the server

const db = process.env.DB_URI;
mongoose.connect(db, err => {
    if (err) {
        console.log(err)
    }
})
app.listen(port, () => {
    console.log(`Server is listening: ${port}`);
});