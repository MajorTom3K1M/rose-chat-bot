const line = require('@line/bot-sdk');
const configLine = require('../config/line.config')

const resolveOrderStatus = require('../util/resolveOrderStatus')
const handleShoppingState = require('../util/handleShoppingState')
const handleDefaultState = require('../util/handleDefaultState')

const paymentHandler = require('../actions/image/paymentHandler')
const shippingHandler = require('../actions/location/shippingHandler')

const client = new line.Client(configLine);

const handleMessageEvent = async (event) => {
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
            msg = handleDefaultState(event)
            break;
    }

    if(msg instanceof Promise) {
        msg = msg.then(r => r)
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = handleMessageEvent
