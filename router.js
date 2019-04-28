const express = require('express')
const router = express.Router()
const line = require('@line/bot-sdk');

const {config, handleEvent, handleMessageEvent} = require('./config/line.controller');

const WebHook = require('./controllers/webhook.controller');

router.post('/webhook', line.middleware(config), WebHook);
router.get('/webhook', (req, res) => res.send("Hello"))

module.exports = router;
