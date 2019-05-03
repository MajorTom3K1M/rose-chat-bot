const express = require('express')
const router = express.Router()
const line = require('@line/bot-sdk');

const  ConfigLine  = require('./config/line.config');

const WebHook = require('./controllers/webhook.controller');
const {getProduct, addProduct } = require('./controllers/product.controller');

router.post('/webhook', line.middleware(ConfigLine), WebHook);

router.get('/products',getProduct);
router.post('/product',addProduct);

module.exports = router;
