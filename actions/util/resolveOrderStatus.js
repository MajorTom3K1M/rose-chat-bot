const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const order = await DB.collection('Orders')
                        .where('clientId', '==', event.source.userId)
                        .where('status', '<', 'shipped').where('status', '>', 'shipped')
                        .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
                        .get()

  if (order.size() == 0) return "None"
  
  let currentOrder = order.docs.pop()
  return currentOrder.data().status
}
