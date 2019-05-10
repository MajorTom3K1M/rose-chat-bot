const deleteOrder = require('../util/deleteOrder')

module.exports = cancelOrderHandler = async event => {
  await deleteOrder(event)
  return msg = {
      type: 'text',
      text: 'ยกเลิกรายการปัจจุบัน'
  }
}
