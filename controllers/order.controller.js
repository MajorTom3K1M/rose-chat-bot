const DB = require('./../config/firebase.config')
const Validator = require("validatorjs");

const createOrder = function(req, res) {
    let { clientId, items } = req.body;
    const rules = {
        clientId: "required",
        items: "required",
    };
    let validation = new Validator(req.body, rules);
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
const updateUserOrder = function(req, res) {
    let { clientId } = req.params; 
    let { items, qty } = req.body;
    const rules = {
        clientId: "required",
    };
    /*let validation = new Validator(req.body, rules);
    validation.passes(() => {
        var test = DB.collection('Orders').get().where("clientId", "==", "15")
        console.log(test)
    });*/
}

module.exports = { createOrder, updateUserOrder }