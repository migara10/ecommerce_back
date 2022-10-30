const itemsModal = require('../models/itemModel');

module.exports.saveItem = async (req,res) => {
    let newItem = itemsModal(req.body);
    console.log(newItem);
    try{
        const savedItem = await itemsModal.create(newItem);
        res.status(200).json({state:true, msg: "new item saved successfully!"})
    }catch(error) {
        console.log(error)
        res.status(400).json({state:false, msg: "new item saved unsuccessfully!"})
    }
}

