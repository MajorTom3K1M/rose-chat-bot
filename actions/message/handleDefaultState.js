const includesSome = require('../util/includesSome')

const manageOrderHandler = require('./manageOrderHandler')
const showHistoryHandler = require('./showHistoryHandler')

module.exports = handleDefaultState = async event => {
  let msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }

  let eventText = ''
  if(event.message.type === 'text') {
      eventText = event.message.text.toLowerCase()
  }

  if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์', 'ลิส', 'สินค้า', 'product', 'buy', 'ซื้อ', 'shop', 'ช็อป'])) {
    msg = await manageOrderHandler(event)
  }
  else if (includesSome(eventText, ['examine', 'check', 'เช็ค', 'ประวัติการสั่งซื้อ', 'history'])) {
    msg = await showHistoryHandler(event)
  }

  return msg
}