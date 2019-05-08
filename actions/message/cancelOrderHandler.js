const resolveOrderSnapshot = require('../util/resolveOrderSnapshot')

module.exports = cancelOrderHandler = event => {
  resolveOrderSnapshot(event, 'shopping')
    .then(result => result.update({status: "cancelled"}))

  return msg = {
      type: 'text',
      text: 'ยกเลิกรายการปัจจุบัน'
  }
}
