const line = require('@line/bot-sdk');
const configLine = require('../../config/line.config')
const client = new line.Client(configLine);

const resolveOrderStatus = require('../../util/resolveOrderStatus')
const handleShoppingState = require('../../util/handleShoppingState')
const handleDefaultState = require('../../util/handleDefaultState')

const paymentHandler = require('../image/paymentHandler')
const shippingHandler = require('../location/shippingHandler')

module.exports = function handleMessageEvent(event) {
    let orderStatus = resolveOrderStatus(event)

    let msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    }

    switch(orderStatus) {
        case "paying":
            if (event.message.type === "sticker") {
                msg = paymentHandler(event)
            }
            break;
        case "shipping":
            if (event.message.type === "location") {
                msg = shippingHandler(event)
            }
            break;
        case "shopping":
            msg = handleShoppingState(event)
            break;
        default:
            defaultPromise = handleDefaultState(event)
            msg = defaultPromise.then(r => r)
            break;
    }

    console.log("messageEventHandler " + msg)
    return client.replyMessage(event.replyToken, msg);
}


