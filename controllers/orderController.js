const orderModel = require('../models/orderModel');
const ItemRecordModel = require('../models/itemRocordModel');
const emitterFile = require('./my_emitter');
const myEmitter = emitterFile.emitter;

module.exports.getAllOrders = async (req,res) => {
    console.log('jjkjjjj')
}

module.exports.createNewOrder = async (req, res) => {
    myEmitter.emit("update_order", req.body.item)
    // console.log(req.body.item)

    /* var books = [{ name: 'Mongoose Tutorial', price: 10, quantity: 25 },
    { name: 'NodeJS tutorial', price: 15, quantity: 5 },
    { name: 'MongoDB Tutorial', price: 20, quantity: 2 }]; */

    /* orderModel.collection.create(books, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
    }); */
    try {
        const savedOrder = await orderModel.create(req.body.user);
        res.status(200).json({ state: true, msg: "new order saved successfully!" })
        if (savedOrder) {
            const data = req.body.item;
            data.forEach(element => {
                ItemRecordModel.insertMany([
                    {
                        orders_id: savedOrder.order_id,
                        item_id: element.data.item_id,
                        item_name: element.data.item_name,
                        product_name: element.product_name,
                        qty: element.qty
                    },
                ]).then(function () {
                    console.log("Data inserted")  // Success
                }).catch(function (error) {
                    console.log(error)      // Failure
                });
            });

            /* try {
                console.log(req.body.item[1])
                let data = {
                    orders_id: savedOrder.order_id
                }
                const savedItem = await ItemRecordModel.create(data);
            } catch (error1) {
                console.log(error1, 'error1')
            } */
        }
        // console.log(savedItem.order_id, 'user')
    } catch (error2) {
        console.log(error2, 'error2')
        res.status(400).json({ state: false, msg: "new order saved unsuccessfully!" })
    }
}

