const line = require('@line/bot-sdk');
const configLine = require('../config/line.config')
const client = new line.Client(configLine);

module.exports = followEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'ขอบคุณที่กลับมาติดตามหนูนะคะ >///<'
    }

    return client.replyMessage(event.replyToken, msg)
}
