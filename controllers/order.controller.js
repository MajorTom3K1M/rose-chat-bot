const DB = require('./../config/firebase.config')
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
const updateUserOrder = function(req, res) {
    let { itemId, orderId } = req.params; 
    const rules = {
        orderId: "required",
        itemId: "required"
    };
    let validation = new Validator(req.body, rules);
    /*
    validation.passes(() => {
        let product = await DB.collection('Products').doc(itemId).get()
        if(product.quantity <= 0) {
            res.status(200).json({})
        }
        else {
            await DB.collection('Orders').doc(orderId).get()
                .then(async (snapshot) => {
                    await DB.collection('Products').doc(itemId).update({
                        quantity: quantity - 1 || quantity == "" ? quantity: snapshot.data().quantity - 1,
                        price: price || price == "" ? price: snapshot.data().price,
                        title: title || title == "" ? title: snapshot.data().title,
                        picture: picture || picture == "" ? picture: snapshot.data().picture,
                    })
                    if(snapshot.data().items.find(item => item.id == itemId) != null) {
                        await DB.collection('Orders').doc(orderId).update({
                            items: 
                        })
                    }
                    else {
                        await DB.collection('Orders').doc(orderId).add({
                            items: 
                        })
                    }

                })
        }
    });
    */
}

module.exports = { createOrder, updateUserOrder }