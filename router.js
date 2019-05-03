const express = require('express')
const router = express.Router()
const line = require('@line/bot-sdk');

const  ConfigLine  = require('./config/line.config');

const WebHook = require('./controllers/webhook.controller');

router.post('/webhook', line.middleware(ConfigLine), WebHook);

module.exports = router;
