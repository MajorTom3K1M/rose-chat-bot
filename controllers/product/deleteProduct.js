const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const deleteProduct = async function (req, res) {
    let { id } = req.params;
    const rules = {
        id: "required"
    };
    let validation = new Validator(req.params, rules);
    validation.passes(async () => {
        await DB.collection('Products').doc(id).delete()
        .then((result) => {
            res.status(200).json({ deleted: true });
        })
        .catch((err) => {
            res.status(404).json({ id: 'Not Found' })
        })
    });
    validation.fails(() => {
        res.status(404).json(validation.errors)
    })
}

module.exports = {
    deleteProduct
}