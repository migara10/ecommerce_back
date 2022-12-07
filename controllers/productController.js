const productModel = require('../models/productModel');

module.exports.saveProduct = async (req, res) => {
    let newProduct = productModel({
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_disc: req.body.product_disc,
        product_price: req.body.product_price,
        product_imageuri: req.file.path.replace(/\\/g, "/"),
    });
    try {
        const savedProduct = await productModel.create(newProduct);
        res.status(200).json({ state: true, msg: "new product saved successfully!", data: savedProduct })

    } catch (error) {
        console.log(error)
        res.status(400).json({ state: false, msg: "new product saved unsuccessfully!" })
    }
}
module.exports.editProduct = async (req, res) => {
    let newProduct = productModel({
        _id:req.body._id,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_disc: req.body.product_disc,
        product_price: req.body.product_price,
        product_promo_price: req.body.product_promo_price,
        isPromo: req.body.isPromo,
        product_imageuri:req.file? req.file.path.replace(/\\/g, "/"): req.body.product_imageuri,
    });
    const query = { product_id: parseInt(req.body.product_id) }
    try {
        const savedProduct = await productModel.updateOne(query, newProduct);
        console.log(req.body)
        res.status(200).json({ state: true, msg: "new product saved successfully!", data: savedProduct })

    } catch (error) {
        console.log(error)
        res.status(400).json({ state: false, msg: "new product saved unsuccessfully!" })
    }
}

module.exports.getProducts = async (req, res) => {
    /* const allProducts = await productModel.find({});
    console.log(allProducts);
    res.status(200).json({state:true, msg: "new product saved successfully!", data:allProducts}) */

    var pipeline = [
        // { "$match": { "cust_id": { "$exists": true } } },
        // { "$match": { "cust_id": 54 } },
        // {"$group" : {"_id":null, "order_value":{"$sum":"$order_value"}}}, 
        { "$lookup": { "from": "items", "localField": "product_id", "foreignField": "product_id", "as": "productbyItem" } },
        // {"$sort": {"productbyItem.item_id": 1}},
        // {"$group" : {'_id':'$shipper_id'}}, 
        // {"$group" : {"_id":"$city", "order_value":{"$avg":"$cust_id"}}}, 
        // { "$unwind": "$productbyItem" },
        // {"$project": {"cus_id":"$cust_id","order_value":"$orders_info.order_value",_id:0}}
    ]
    productModel.aggregate(pipeline)
        .then((result) => {
            // console.log(result[0].orders_info)
            // console.log(result)
            res.status(200).json({ state: true, msg: "new product saved successfully!", data: result })
        })
        .catch((error) => {
            console.log(error);
        });
}
module.exports.getProductById = async (req, res) => {
    var pipeline = [
        { $match: { product_id: parseInt(req.params.id) } },
    ]
    productModel.aggregate(pipeline)
        .then((product) => {
            res.status(200).json({ state: true, data: product })
        })
        .catch((error) => {
            console.log(error);
        });
}



async function getAllProductsbyItems() {
    var pipeline = [
        // { "$match": { "cust_id": { "$exists": true } } },
        // { "$match": { "cust_id": 54 } },
        // {"$group" : {"_id":null, "order_value":{"$sum":"$order_value"}}}, 
        { "$lookup": { "from": "items", "localField": "product_id", "foreignField": "product_id", "as": "productbyItem" } },
        // {"$group" : {'_id':'$shipper_id'}}, 
        // {"$group" : {"_id":"$city", "order_value":{"$avg":"$cust_id"}}}, 
        // { "$unwind": "$productbyItem" },
        // {"$project": {"cus_id":"$cust_id","order_value":"$orders_info.order_value",_id:0}}
    ]
    productModel.aggregate(pipeline)
        .then((result) => {
            // console.log(result[0].orders_info)
            // console.log(result)
            return result;
        })
        .catch((error) => {
            console.log(error);
        });
}
