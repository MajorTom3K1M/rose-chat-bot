var { getProduct } = require('./getProduct');
var { getProductByID } = require('./getProductByID');
var { createProduct } = require('./createProduct');
var { deleteProduct } = require('./deleteProduct');
var { updateProduct } = require('./updateProduct');

module.exports = {
    getProduct,
    getProductByID,
    createProduct,
    deleteProduct,
    updateProduct
}