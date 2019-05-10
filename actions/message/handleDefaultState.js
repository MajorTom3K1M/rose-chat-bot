const includesSome = require('../util/includesSome')

const manageOrderHandler = require('./manageOrderHandler')
const showHistoryHandler = require('./showHistoryHandler')

module.exports = handleDefaultState = event => {
  let msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }

  let eventText = event.message.text.toLowerCase()
  if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์', 'ลิส', 'สินค้า', 'product', 'buy', 'ซื้อ'])) {
    msg = manageOrderHandler(event)
  }
  else if (includesSome(eventText, ['examine', 'check', 'เช็ค', 'ประวัติการสั่งซื้อ', 'history'])) {
    msg = showHistoryHandler(event)
  }

  return msg
}