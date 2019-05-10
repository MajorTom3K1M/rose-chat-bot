const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = event => {
  let status = 'None'
  
  DB.collection('Orders')
    .where('clientId', '==', event.source.userId)
    .where('status', '==', 'shopping')
    .onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.get('status'))
        status = doc.get('status')
      })
    })

  DB.collection('Orders')
    .where('clientId', '==', event.source.userId)
    .where('status', '==', 'paying')
    .onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        status = doc.get('status')
      })
    })

  return status
  

  /*
  console.log(orderSnapshot)

  let orderDocs = orderSnapshot.docs
  if (orderDocs.length <= 0) return "None"                      
  let currentOrderStatus = orderDocs[0].get('status')
  return currentOrderStatus
  */
}
