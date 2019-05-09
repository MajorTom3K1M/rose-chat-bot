const line = require('@line/bot-sdk');
const configLine = require('../../config/line.config')
const client = new line.Client(configLine);

const resolveOrderStatus = require('../util/resolveOrderStatus')
const handleShoppingState = require('../util/handleShoppingState')
const handleDefaultState = require('../util/handleDefaultState')
const includesSome = require('../util/includesSome')

const debugHandler = require('../debug/debugHandler')
const rudeWordHandler = require('../message/rudeWordHandler')
const paymentHandler = require('../image/paymentHandler')
const shippingHandler = require('../location/shippingHandler')

module.exports = handleMessageEvent = event => {
    let orderStatus = resolveOrderStatus(event)
    let eventText = event.message.text.toLowerCase()

    let msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    }

    if (includesSome(eventText, ['fuck', 'fuxk', 'ควย', 'สัส', 'เหี้ย', 'ชิบหาย', 'มึง', 'กู', 'เย็ด', 'เชี่ย', 'fu*k', 'ค ว ย', 'ห่า', 'หำ', 'หี', 'ระยำ'])) {
        msg = rudeWordHandler(event)
    } 
    else if (includesSome(eventText, ['debug'])) {
        msg = debugHandler(event)
    }
    else {
        switch(orderStatus) {
            case "paying":
                if (event.message.type === "sticker") msg = paymentHandler(event)
                break
            case "shipping":
                if (event.message.type === "location") msg = shippingHandler(event)
                break
            case "shopping":
                msg = handleShoppingState(event)
                break
            default:
                msg = handleDefaultState(event)
                break
        }
    }

    return Promise.resolve(msg)
        .then(result => {
            console.log(result)
            client.replyMessage(event.replyToken, result)
        })
}
