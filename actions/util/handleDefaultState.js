const includesSome = require('./includesSome')

const createOrderHandler = require('../message/createOrderHandler')
const showHistoryHandler = require('../message/showHistoryHandler')

const handleDefaultState = event => {
  let eventText = event.message.text.toLowerCase()

  if (includesSome(eventText, ['buy', 'ซื้อ', 'รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
    return msg = createOrderHandler(event)
  }
  else if (includesSome(eventText, ["เช็ค", 'ประวัติการสั่งซื้อ', 'history'])) {
    return msg = showHistoryHandler(event)
  }

  return msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }
}

module.exports = handleDefaultState