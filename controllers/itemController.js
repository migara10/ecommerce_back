const itemsModal = require('../models/itemModel');
const emitterFile = require('./my_emitter');
const { getProductById } = require('./productController');
const myEmitter = emitterFile.emitter;

module.exports.saveItem = async (req, res) => {
    try {
        let cat = ['xl', 'l', 'm', 's', 'xs'];
        const data = [];
        for (let i = 0; i < cat.length; i++) {
            await itemsModal.insertMany([

                {
                    product_id: req.body.product_id,
                    item_name: cat[i],
                    item_qty: req.body.product_items[cat[i]] ? req.body.product_items[cat[i]] : 0,
                    item_id: getItemId(req.body.product_id, cat[i])
                },
            ])
        }
        res.status(200).json({ state: true, msg: 'items added successfully' })
    } catch {
        res.status(400).json({ state: true, msg: 'items added unsuccessfully' })
    }
}
getItemId = (product_id, item_name) => {
    let itemCode = ''
    if (item_name) {
        switch (item_name) {
            case "xs":
                itemCode = 100;
                break;
            case "s":
                itemCode = 101;
                break;
            case "m":
                itemCode = 102;
                break;
            case "l":
                itemCode = 103;
                break;
            case "xl":
                itemCode = 104;
                break;
        }
        return product_id + '/' + itemCode;
    }
}

module.exports.updateProduct = async (data) => {

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
        res.status(400).json({ state: false, msg: 'update product unsuccessfully' })
    }

}

myEmitter.on("update_order", (data) => {
    this.updateProduct(data)
})
