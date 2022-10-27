const mongoose = require('mongoose');
const Schems = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new Schema({

    product_id: {
        type: Number,
    },
    item_id: {
        type: Number,
    },
    item_name: {
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
    }
})