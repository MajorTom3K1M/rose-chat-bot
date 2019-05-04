const line = require('@line/bot-sdk');
const  configLine  = require('../config/line.config')
const DB = require('../config/firebase.config')

const client = new line.Client(configLine);

const includesSome = require('../util/includesSome')
const handleEvent = require('../util/handleEvent')
const resolveOrderStatus = require('../util/resolveOrderStatus')

const paymentHandler = require('../actions/image/paymentHandler')
const shippingHandler = require('../actions/location/shippingHandler')
const cancelOrderHandler = require('../actions/message/cancelOrderHandler')
const checkOrderHandler = require('../actions/message/checkOrderHandler')
const debugHandler = require('../actions/debug/debugHandler')
const createOrderHandler = require('../actions/message/createOrderHandler')
const resolveOrderHandler = require('../actions/message/resolveOrderHandler')
const rudeWordHanlder = require('../actions/message/rudeWordHandler')
const showHistoryHandler = require('../actions/message/showHistoryHandler')
const updateOrderHandler = require('../actions/message/updateOrderHandler')

async function handleMessageEvent(event) {
    let eventText = event.message.text.toLowerCase()
    let orderStatus = resolveOrderStatus(event)

    let msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    }

    switch(orderStatus) {
        case "paying":
            if (event.message.type === "sticker") {
                paymentHandler(event)
            }
            break;
        case "shipping":
            if (event.message.type === "location") {
                shippingHandler(event)
            }
            break;
        case "shopping":
            if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
                updateOrderHandler(event)
            }
            else if (includesSome(eventText, ['ตรวจสอบ', 'check cart', 'shopping cart', 'cart', 'cart list', 'list'])) {
                checkOrderHandler(event)
            }
            else if (includesSome(eventText, ['ชำระเงิน', 'ยืนยันรายการ', 'pay now', 'payment', 'checkout', 'check out'])) {
                resolveOrderHandler(event)
            }
            else if (includesSome(eventText, ['ยกเลิก', 'cancel'])) {
                cancelOrderHandler(event)
            }
            break;
        default:
            if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
                createOrderHandler(event)
            }
            else if (includesSome(eventText, ['ประวัติการสั่งซื้อ', 'history'])) {
                showHistoryHandler(event)
            }
            else if (includesSome(eventText, ['fuck', 'fuxk', 'ควย', 'สัส', 'เหี้ย', 'ชิบหาย', 'มึง', 'กู', 'เย็ด', 'เชี่ย', 'fu*k', 'ค ว ย', 'ห่า', 'หำ', 'หี', 'ระยำ'])) {
                rudeWordHanlder(event)
            }
            else if (includesSome(eventText, ['debug'])) {
                debugHandler(event)
            }
            break;
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = handleMessageEvent
