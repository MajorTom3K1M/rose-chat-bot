const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const updateProduct = async function (req, res) {
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

module.exports = {
    updateProduct
}