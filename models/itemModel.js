const mongoose = require('mongoose');
const Schems = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new Schema({

    product_id: {
        type: Number,
    },
    item_name: {
        type: Number,
        required: true, 
        enum: ['s', 'm', 'l', 'xl'],
    },
    item_id: {
        type: Number,
        default: item_name
    },
    /* item_name: {
        type: Number,
        required: true, 
    },
    item_imageuri:{
        type: String,
        required: false,
    },
    item_qty: {
        type: Number,
        required: true,
    } */
})

itemSchema.plugin(AutoIncrement, { inc_field: 'item_id' });
const Item = mongoose.model('product', itemSchema); // save item in db
module.exports = Item;