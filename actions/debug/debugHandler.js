const resolveOrderStatus = require('../util/resolveOrderStatus')

module.exports = debugHandler = event => {
  return msg = {
    type: 'text',
    text: "Your order status >>> " + resolveOrderStatus(event)
  }
}