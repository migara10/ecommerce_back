const productModel = require('../models/productModel');

module.exports.saveProduct = async (req, res) => {
    let newProduct = productModel(req.body);
    try{
        const savedProduct = await productModel.create(newProduct);
        res.status(200).json({state:true, msg: "new product saved successfully!"})

    }catch(error) {
        console.log(error)
        res.status(400).json({state:false, msg: "new product saved unsuccessfully!"})
    }
}

module.exports.getProductById = async (req,res) => {
    /* const allProducts = await productModel.find({});
    console.log(allProducts);
    res.status(200).json({state:true, msg: "new product saved successfully!", data:allProducts}) */
    
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
            res.status(200).json({state:true, msg: "new product saved successfully!", data:result})
        })
        .catch((error) => {
            console.log(error);
        });
}

async function getAllProductsbyItems(){
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