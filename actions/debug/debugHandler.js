const resolveOrderStatus = require('../util/resolveOrderStatus')

module.exports = debugHandler = async event => {
  return msg = {
    type: 'text',
    text: resolveOrderStatus(event)
  }
}