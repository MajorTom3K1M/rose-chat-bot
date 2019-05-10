const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const orderSnapshot = await DB.collection('Orders')
                        .where('clientId', '==', event.source.userId)
                        .where('status', '<', 'shipped').where('status', '>', 'shipped')
                        .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
                        .get()

  console.log(orderSnapshot)

  let orderDocs = orderSnapshot.docs
  if (orderDocs.length <= 0) return "None"                      
  let currentOrderStatus = orderDocs[0].get('status')
  return currentOrderStatus
}
