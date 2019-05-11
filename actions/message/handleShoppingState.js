const includesSome = require('../util/includesSome')

const cancelOrderHandler = require('./cancelOrderHandler')
const checkOrderHandler = require('./checkOrderHandler')
const resolveOrderHandler = require('./resolveOrderHandler')
const manageOrderHandler = require('./manageOrderHandler')

module.exports = handleShoppingState = async event => {
  let msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }

  let eventText = ''
  if(event.message.type === 'text') {
    eventText = event.message.text.toLowerCase()
  }
  if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์', 'ลิส', 'product', 'buy', 'ซื้อ', 'shop', 'ช็อป'])) {
    msg = await manageOrderHandler(event)
  }
  else if (includesSome(eventText, ['ตรวจสอบ', 'examine', 'cart', 'ตะกร้า'])) {
    msg = await checkOrderHandler(event)
  }
  else if (includesSome(eventText, ['ชำระ', 'ยืนยัน', 'pay', 'payment', 'checkout', 'check out', 'เสร็จ', 'เรียบร้อย'])) {
    msg = resolveOrderHandler(event)
  }
  else if (includesSome(eventText, ['ไม่', 'cancel', 'เลิก', 'delete', 'ลบ', 'remove'])) {
    msg = cancelOrderHandler(event)
  }

  return msg
}

