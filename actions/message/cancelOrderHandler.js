const resolveOrderSnapshot = require('../util/resolveOrderByStatus')

module.exports = cancelOrderHandler = event => {
  resolveOrderSnapshot(event, 'shopping')
    .then(result => result.update({status: "cancelled"}))

  return msg = {
      type: 'text',
      text: 'ยกเลิกรายการปัจจุบัน'
  }
}
