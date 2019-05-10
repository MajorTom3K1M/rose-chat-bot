const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const orderSnapshot = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .where('status', '<', 'shipped').where('status', '>', 'shipped')
                                .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
  
  let status = 'None'
  orderSnapshot.get()
               .then(snapshot => {
                 let docs = snapshot.docs
                 status = docs.find(doc => doc.get('status') === 'shopping' || doc.get('status') === 'paying')
                              .get('status')
               })
  
  return status
}
