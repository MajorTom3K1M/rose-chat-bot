const line = require('@line/bot-sdk');
const configLine = require('../../config/line.config')
const client = new line.Client(configLine);

module.exports = joinEventHandler = event => {
    let msg = [
        {
            type: 'text',
            text: 'สวัสดีค่ะ หนูชื่อโรเซ่ ฝากตัวด้วยนะคะ'
        },
        {
            type: 'sticker',
            packageId: '11538',
            stickerId: '51626495'
        }
    ]
    return client.replyMessage(event.replyToken, msg)
}
