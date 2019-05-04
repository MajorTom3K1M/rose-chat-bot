const resolveOrderSnapshot = require('../../util/resolveOrderSnapshot')

const cancelOrderHandler = async (event) => {
  let order = resolveOrderSnapshot(event, 'shopping')
  order.then(result => result.update({status: "cancelled"}))
  return msg
}

module.exports = cancelOrderHandler