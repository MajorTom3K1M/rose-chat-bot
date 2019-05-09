const line = require('@line/bot-sdk');
const configLine = require('../config/line.config')
const client = new line.Client(configLine);

module.exports = unfollowEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'ไม่นะ จะไม่ติดตามหนูแล้วจริงๆ หรอ TT'
    }

    return client.replyMessage(event.replyToken, msg)
}
