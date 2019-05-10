const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const orderSnapshot = await DB.collection('Orders')
                        .where('clientId', '==', event.source.userId)
                        .where('status', '<', 'shipped').where('status', '>', 'shipped')
                        .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
                        .get()

  let currentOrder = orderSnapshot.docs
  if (currentOrder.exists) return "None"
  return currentOrder.data().status
}
