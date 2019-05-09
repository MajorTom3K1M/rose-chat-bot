const express = require('express')
const router = express.Router()

const WebHook = require('./controllers/webhook.controller');
const {getProduct, createProduct, updateProduct, deleteProduct, getProductByID } = require('./controllers/product');
const { createOrder, updateOrder } = require('./controllers/order');
router.post('/webhook', WebHook);

router.get('/products',getProduct);
router.get('/product/:id', getProductByID);
router.post('/product',createProduct);
router.put('/product/:id',updateProduct);
router.delete('/product/:id',deleteProduct);

router.post('/order/:clientId/:itemId', updateOrder);
// router.post('/webhook/order/:clientId:itemId', createOrder);
// router.post('/webhook/updateorder/:orderid:itemid',updateUserOrder)

module.exports = router;
