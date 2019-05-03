const express = require('express')
const router = express.Router()
const line = require('@line/bot-sdk');

const { config } = require('./config/line.controller');

const WebHook = require('./controllers/webhook.controller');

router.post('/webhook', line.middleware(config), WebHook);

module.exports = router;
