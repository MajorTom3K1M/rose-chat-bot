const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const updateOrder = function(req, res) {
    let { itemId, clientId } = req.params; 
    const rules = {
        orderId: "required",
        itemId: "required"
    };
    let validation = new Validator(req.params, rules);
    validation.passes(async () => {
        let order = await DB.collection('Orders').where("clientId","==",clientId)
            .where("status","==","shopping").get();
        order.forEach(async (doc) => {
            const index = doc.data().items.findIndex((item) => itemId == item.id);
            const item = doc.data().items[index];
            console.log(index, "  ", item);
            console.log(doc.id);
            await DB.collection('Orders').doc(doc.id).update({
                items: [
                    ...doc.data().items.slice(0, index),
                    { ...item, qty: Number(item.qty) + 1 },
                    ...doc.data().items.slice(index + 1)
                ]
            }).then(() => res.status(200).json({ updated: true }))
            .catch((err) => res.status(400).json({ message: "Bad Request" }));
        })
    });
    validation.fails(function () {
        res.status(400).json(validation.errors)
    })
}
module.exports = { updateOrder }