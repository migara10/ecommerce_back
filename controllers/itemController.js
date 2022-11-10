const itemsModal = require('../models/itemModel');
const emitterFile = require('./my_emitter');
const myEmitter = emitterFile.emitter;

module.exports.saveItem = async (req, res) => {
    let newItem = itemsModal(req.body);
    console.log(newItem);
    try {
        const savedItem = await itemsModal.create(newItem);
        res.status(200).json({ state: true, msg: "new item saved successfully!" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ state: false, msg: "new item saved unsuccessfully!" })
    }
}

/* module.exports.updateProduct = async (req, res) => {
    console.log('update', req.body)
    
    try {
        const writeOperations = req.body.map((x) => {
            return {
                updateOne: {
                    filter: { item_id: x.data.item_id },
                    update: { item_qty: (x.data.item_qty - x.qty) }
                }
            };
        });

        await itemsModal.bulkWrite(writeOperations);

        res.status(200).json({ state: true, msg: 'checkout successfully' })
    } catch (e) {
        res.status(400).json({ state: false, msg: 'checkout unsuccessfully' })
    }

} */

module.exports.updateProduct = async (data) => {
    console.log('update', data)
    
    try {
        const writeOperations = data.map((x) => {
            return {
                updateOne: {
                    filter: { item_id: x.data.item_id },
                    update: { item_qty: (x.data.item_qty - x.qty) }
                }
            };
        });

        await itemsModal.bulkWrite(writeOperations);

        // res.status(200).json({ state: true, msg: 'checkout successfully' })
    } catch (e) {
        // res.status(400).json({ state: false, msg: 'checkout unsuccessfully' })
    }

}

myEmitter.on("update_order", (data) => {
    this.updateProduct(data)
})
