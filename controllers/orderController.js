const orderModel = require('../models/orderModel');
const ItemRecordModel = require('../models/itemRocordModel');
const emitterFile = require('./my_emitter');
const myEmitter = emitterFile.emitter;

/* module.exports.getAllOrders = async (req,res) => {
    var pipeline = [
        // { "$match": { "cust_id": { "$exists": true } } },
        // { "$match": { "cust_id": 54 } },
        // {"$group" : {"_id":null, "order_value":{"$sum":"$order_value"}}}, 
        { "$lookup": { "from": "item_records", "localField": "order_id", "foreignField": "orders_id", "as": "orderItems" } },
        // {"$group" : {'_id':'$shipper_id'}}, 
        // {"$group" : {"_id":"$city", "order_value":{"$avg":"$cust_id"}}}, 
        // { "$unwind": "$productbyItem" },
        // {"$project": {"cus_id":"$cust_id","order_value":"$orders_info.order_value",_id:0}}
    ]
    orderModel.aggregate(pipeline)
        .then((result) => {
            res.status(200).json({ state: true, data: result })
        })
        .catch((error) => {
            res.status(400).json({ state: true, msg: "can't gel all orders!"})
        });
}
 */

module.exports.getAllOrders = async (req, res) => {
    let match = {};
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 1;
    let skip = limit * (page - 1);
    if (req.query.search) {
        match.$or = [
            { firstName: new RegExp(req.query.search, "i") },
            { lastName: new RegExp(req.query.search, "i") },
        ]
    }
    if (req.query.city) {
        match.city = (req.query.city)
    }
    var pipeline = [
        { $match: match },
        { "$lookup": { "from": "item_records", "localField": "order_id", "foreignField": "orders_id", "as": "orderItems" } },
        {
            $facet: {
                data: [{ $skip: skip }, { $limit: limit }],
                dataInfo: [{ $group: { _id: null, count: { $sum: 1 } } }]
            }
        },
        {
            $project: {
                _id: 0,
                docs: "$data",
                // totalDocs: "$dataInfo",
                totalDocs: {$first: "$dataInfo.count"},
                limit: `${limit}`,
                // totalDocs: "$dataInfo.count",
                page: `${page}`
            }
        },

    ]
    orderModel.aggregate(pipeline)
        .then((result) => {
            res.status(200).json({ state: true, data: result })
        })
        .catch((error) => {
            res.status(400).json({ state: true, msg: "can't gel all orders!" })
        });
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
        res.status(200).json({ state: true, msg: "checkout successfully!" })
        if (savedOrder) {
            const data = req.body.item;
            data.forEach(element => {
                ItemRecordModel.insertMany([
                    {
                        orders_id: savedOrder.order_id,
                        item_id: element.data.item_id,
                        item_name: element.data.item_name,
                        product_name: element.product_name,
                        product_imageuri: element.product_imageuri,
                        product_disc: element.product_disc,
                        qty: element.qty
                    },
                ]).then(function () {
                    // console.log("Data inserted")  // Success
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

