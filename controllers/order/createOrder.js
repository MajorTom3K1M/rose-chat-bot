const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const createOrder = function(req, res) {
    let { clientId, items } = req.params;
    const rules = {
        clientId: "required",
        items: "required",
    };
    let validation = new Validator(req.params, rules);
    validation.passes(() => {
        DB.collection('Orders').add({
            clientId: clientId,
            items: items,
            status: "shopping"
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            let respone = { status: true }
            res.status(200).json(respone)
        }).catch((err) => {
            console.error("Error adding document: ", error);
            let respone = { status: false }
            res.status(200).json(respone)
        })
    });
    validation.fails(function () {
        res.status(400).json(validation.errors)
    })
}

module.exports = { createOrder }