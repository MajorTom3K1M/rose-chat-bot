const DB = require('../../config/firebase.config')
const Validator = require("validatorjs");

const getProduct = async function (req, res) {
    let columns = []
    const noteSnapshot = await DB.collection('Products').get();
    noteSnapshot.forEach(async (doc) => {
        columns.push({id:doc.id,...doc.data()})
    })
    res.status(200).json(columns)
}

module.exports = {
    getProduct
}