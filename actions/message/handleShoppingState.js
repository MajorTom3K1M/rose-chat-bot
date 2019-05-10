const includesSome = require('../util/includesSome')

const cancelOrderHandler = require('./cancelOrderHandler')
const checkOrderHandler = require('./checkOrderHandler')
const resolveOrderHandler = require('./resolveOrderHandler')
const updateOrderHandler = require('./updateOrderHandler')

module.exports = handleShoppingState = async event => {
  let msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }

  let eventText = event.message.text.toLowerCase()
  if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์', 'ลิส', 'สินค้า', 'product'])) {
    msg = updateOrderHandler(event)
  }
  else if (includesSome(eventText, ['ตรวจสอบ', 'examine', 'cart', 'list', 'list'])) {
    msg = await checkOrderHandler(event)
  }
  else if (includesSome(eventText, ['ชำระ', 'ยืนยัน', 'pay', 'payment', 'checkout', 'check out'])) {
    msg = resolveOrderHandler(event)
  }
  else if (includesSome(eventText, ['ไม่', 'cancel', 'เลิก', 'delete', 'ลบ', 'remove'])) {
    msg = cancelOrderHandler(event)
  }

  return msg
}

