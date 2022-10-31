const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const itemSchema = new Schema({

    product_id: {
        type: Number,
    },
    item_name: {
        type: String,
        required: true,
        enum: ['xs','s', 'm', 'l', 'xl'],
    },
    item_id: {
        type: String,
    },
    item_qty: {
        type: Number,
        required: true,
    }
    /* item_id: {
        type: String,
        default: () => {
            if (this.item_name) {
                return this.item_name
            } return false
        },
    }, */
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

itemSchema.pre('save', function (next) {
    let itemCode = ''
    if (this.item_name) {
        switch (this.item_name) {
            case "xs":
                this.itemCode = 100;
                break;
            case "s":
                this.itemCode = 101;
                break;
            case "m":
                this.itemCode = 102;
                break;
            case "l":
                this.itemCode = 103;
                break;
            case "xl":
                this.itemCode = 104;
                break;
        }
        this.item_id = this.product_id + '/' + this.itemCode;
    }

    next();
});

// itemSchema.plugin(AutoIncrement, { inc_field: 'item_id' });
const Item = mongoose.model('item', itemSchema); // save item in db
module.exports = Item;