const express = require('express')
const router = express.Router()

const WebHook = require('./controllers/webhook.controller');
const {getProduct, addProduct, editProduct, deleteProduct, getProductById } = require('./controllers/product.controller');
const {createOrder, updateUserOrder} = require('./controllers/order.controller');
router.post('/webhook', WebHook);

router.get('/products',getProduct);
router.get('/product/:id', getProductById);
router.post('/product',addProduct);
router.put('/product/:id',editProduct);
router.delete('/product/:id',deleteProduct);
// router.post('/webhook/order/:clientId:itemId', createOrder);
// router.post('/webhook/updateorder/:orderid:itemid',updateUserOrder)

module.exports = router;
