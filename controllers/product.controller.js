const DB = require('../config/firebase.config')
const Validator = require("validatorjs");

const addProduct = function (req, res) {
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
            res.status(200).json(respone)
        });
    })
    validation.fails(function () {
        res.status(400).json(validation.errors)
    })

}
const getProduct = async function (req, res) {
    let columns = []
    const noteSnapshot = await DB.collection('Products').get();
    noteSnapshot.forEach(async (doc) => {
        columns.push({id:doc.id,...doc.data()})
    })
    res.status(200).json(columns)
}
const editProduct = async function (req, res) {
    let { id } = req.params;
    let { quantity, price, title, picture } = req.body;
    const rules = {
        id: "required"
    };
    let validation = new Validator(req.params, rules);
    validation.passes(async () => {
        await DB.collection('Products').doc(id).get()
        .then(async (snapshot) => {
            //console.log(snapshot.data().price)
            let response = { update: true }
            await DB.collection('Products').doc(id).update({
                quantity: quantity || quantity == "" ? quantity: snapshot.data().quantity,
                price: price || price == "" ? price: snapshot.data().price,
                title: title || title == "" ? title: snapshot.data().title,
                picture: picture || picture == "" ? picture: snapshot.data().picture,
            }).then(() => {res.status(200).json(response);})
            .catch(() => {res.status(400).json({ update:false })})
        }).catch(() => { res.status(404).json({ id: 'Not Found' }) })
    });
    validation.fails(() => {
        res.status(404).json(validation.errors)
    })
}
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
const getProductById = async function (req, res) {
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

module.exports = { getProduct, addProduct, editProduct, deleteProduct, getProductById };