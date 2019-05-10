const line = require('@line/bot-sdk');
const configLine = require('../../config/line.config')
const client = new line.Client(configLine);

module.exports = followEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'ขอบคุณที่กลับมาติดตามหนูนะคะ >///<'
    }
    client.replyMessage(event.replyToken, msg)
    return client.replyMessage(event.replyToken, {
        "type": "sticker",
        "packageId": "11537",
        "stickerId": "52002747"
    })
}
