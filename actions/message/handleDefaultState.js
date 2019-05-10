const includesSome = require('../util/includesSome')

const createOrderHandler = require('./createOrderHandler')
const showHistoryHandler = require('./showHistoryHandler')

module.exports = handleDefaultState = event => {
  let msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }

  let eventText = event.message.text.toLowerCase()
  if (includesSome(eventText, ['buy', 'ซื้อ', 'รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
    msg = createOrderHandler(event)
  }
  else if (includesSome(eventText, ['examine', 'check', 'เช็ค', 'ประวัติการสั่งซื้อ', 'history'])) {
    msg = showHistoryHandler(event)
  }

  return msg
}