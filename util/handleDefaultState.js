const includesSome = require('./includesSome')

const debugHandler = require('../actions/debug/debugHandler')
const createOrderHandler = require('../actions/message/createOrderHandler')
const rudeWordHanlder = require('../actions/message/rudeWordHandler')
const showHistoryHandler = require('../actions/message/showHistoryHandler')

const handleDefaultState = event => {
  let eventText = event.message.text.toLowerCase()

  if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
    return createOrderHandler(event)
            .then(result => result)
  }
  else if (includesSome(eventText, ['ประวัติการสั่งซื้อ', 'history'])) {
    return showHistoryHandler(event)
            .then(result => result)
  }
  else if (includesSome(eventText, ['fuck', 'fuxk', 'ควย', 'สัส', 'เหี้ย', 'ชิบหาย', 'มึง', 'กู', 'เย็ด', 'เชี่ย', 'fu*k', 'ค ว ย', 'ห่า', 'หำ', 'หี', 'ระยำ'])) {
    return rudeWordHanlder(event)
  }
  else if (includesSome(eventText, ['debug'])) {
    return debugHandler(event)
  }

  return msg = {
    type: 'text',
    text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
  }
}

module.exports = handleDefaultState