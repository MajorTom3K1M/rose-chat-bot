const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const orderSnapshot = await DB.collection('Orders')
                        .where('clientId', '==', event.source.userId)
                        .where('status', '<', 'shipped').where('status', '>', 'shipped')
                        .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
                        .get()

  if (orderSnapshot.docs.exists) return "None"                      
  let currentOrderStatus = orderSnapshot.docs.get('status')
  return currentOrderStatus
}
