const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  let statusPromise = Promise.resolve('None')

  await DB.collection('Orders')
          .where('clientId', '==', event.source.userId)
          .where('status', '==', 'shopping')
          .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              console.log(doc.get('status'))
              status = doc.get('status')
            })
          })

  await DB.collection('Orders')
          .where('clientId', '==', event.source.userId)
          .where('status', '==', 'paying')
          .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              status = doc.get('status')
            })
          })
          
  return Promise.resolve(status)

  /*
  console.log(orderSnapshot)

  let orderDocs = orderSnapshot.docs
  if (orderDocs.length <= 0) return "None"                      
  let currentOrderStatus = orderDocs[0].get('status')
  return currentOrderStatus
  */
}
