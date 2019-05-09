const line = require('@line/bot-sdk');
const configLine = require('../config/line.config')
const client = new line.Client(configLine);

module.exports = unfollowEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'จะไม่ติดตามหนูแล้วจริงๆ หรอ T^T'
    }

    return client.replyMessage(event.replyToken, msg)
}
