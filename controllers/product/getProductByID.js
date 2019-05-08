const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const getProductByID = async function (req, res) {
    let { id } = req.params;
    const rules = {
        id: "required"
    };
    let validation = new Validator(req.params, rules);
    validation.passes(async () => {
        await DB.collection('Products').doc(id).get()
        .then((snapshot) =>  res.status(200).json({id:snapshot.id,...snapshot.data()}))
        .catch((err) => res.status(404).json({ id: 'Not Found' }));
    })
    validation.fails(() => {
        res.status(404).json(validation.errors)
    })
}

module.exports = {
    getProductByID
}