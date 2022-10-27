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

module.exports.getProductById = (req,res) => {
    console.log('hryryr')
}