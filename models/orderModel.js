const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new Schema({
    order_id: {
        type: Number,
    },
    order_date: {
        type: Date,
        default: Date.now
        // 2022-09-09T04:03:30.011+00:00
    },
    isPending: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    mobile: {
        type: String,
    },


})

orderSchema.plugin(AutoIncrement, { inc_field: 'order_id' });
const Order = mongoose.model('orders', orderSchema); // save order in db
module.exports = Order;





