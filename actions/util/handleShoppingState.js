const includesSome = require('./includesSome')

const cancelOrderHandler = require('../message/cancelOrderHandler')
const checkOrderHandler = require('../message/checkOrderHandler')
const resolveOrderHandler = require('../message/resolveOrderHandler')
const updateOrderHandler = require('../message/updateOrderHandler')

module.exports = handleShoppingState = event => {
  let msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }

  let eventText = event.message.text.toLowerCase()
  if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
    msg = updateOrderHandler(event)
  }
  else if (includesSome(eventText, ['ตรวจสอบ', 'check cart', 'shopping cart', 'cart', 'cart list', 'list'])) {
    msg = checkOrderHandler(event)
  }
  else if (includesSome(eventText, ['ชำระเงิน', 'ยืนยันรายการ', 'pay now', 'payment', 'checkout', 'check out'])) {
    msg = resolveOrderHandler(event)
  }
  else if (includesSome(eventText, ['ยกเลิก', 'cancel'])) {
    msg = cancelOrderHandler(event)
  }

  return msg
}

