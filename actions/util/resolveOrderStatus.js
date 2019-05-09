const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const order = await DB.collection('Orders')
                        .where('clientId', '==', event.source.userId)
                        .where('status', '<', 'shipped').where('status', '>', 'shipped')
                        .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
                        .get()

  const status = order.data()[0].status
  return status === undefined ? "None" : status
}
