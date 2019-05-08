const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const createProduct = function (req, res) {
    const rules = {
        quantity: "required",
        price: "required",
        title: "required",
        picture: "required|url"
    };
    let validation = new Validator(req.body, rules);
    validation.passes(function () {
        DB.collection("Products").add({
            quantity: req.body.quantity,
            price: req.body.price,
            title: req.body.title,
            picture: req.body.picture
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            let respone = { status: true }
            res.status(200).json(respone)
        }).catch(function (error) {
            console.error("Error adding document: ", error);
            let respone = { status: false }
            res.status(400).json(respone)
        });
    })
    validation.fails(function () {
        res.status(400).json(validation.errors)
    })
}
module.exports = {
    createProduct
}