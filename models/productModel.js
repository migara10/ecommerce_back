const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new Schema({

    product_id: {
        type: Number,
    },
    product_name: {
        type: String,
        required: true, 
    },
    product_category: {
        type: String,
        required: true, 
    },
    product_disc: {
        type: String,
        required: false, 
    },
    product_imageuri:{
        type: String,
        required: true,
    },
    product_price: {
        type: String,
        required: true,
    },
    product_promo_price: {
        type: String,
    },
    isPromo: {
        type: Boolean,
        default: false,
    },
})

productSchema.plugin(AutoIncrement, { inc_field: 'product_id' });
const Product = mongoose.model('product', productSchema); // save product in db
module.exports = Product;