const express = require('express')
const router = express.Router()
const line = require('@line/bot-sdk');

const  configLine  = require('./config/line.config');

const WebHook = require('./controllers/webhook.controller');
const {getProduct, addProduct, editProduct, deleteProduct, getProductById } = require('./controllers/product.controller');

router.post('/webhook', WebHook);

router.get('/products',getProduct);
router.get('/product/:id', getProductById);
router.post('/product',addProduct);
router.put('/product/:id',editProduct);
router.delete('/product/:id',deleteProduct);

module.exports = router;
