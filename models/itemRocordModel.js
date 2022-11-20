const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const itemRecords = new Schema({
    item_ids: {
        type: Number,
    },
    orders_id: {
        type: Number,
    },
    item_id: {
        type: String,
    },
    item_name: {
        type: String
    },
    product_name: {
        type: String
    },
    qty: {
        type: Number
    },
    product_imageuri: {
        type: String,
        required: true,
    },
    product_disc: {
        type: String,
        required: true,
    },

})

itemRecords.plugin(AutoIncrement, { inc_field: 'item_ids' });
const ItemRecord = mongoose.model('item_record', itemRecords); // savitemRecord item record in db
module.exports = ItemRecord;