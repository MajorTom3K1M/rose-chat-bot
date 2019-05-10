const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  let allOrders = []

  let a = await DB.collection('Orders')
          .where('clientId', '==', event.source.userId).get()

  console.log(a)

  await DB.collection('Orders')
          .where('clientId', '==', event.source.userId)
          .where('status', '==', 'shopping')
          .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              allOrders.push(doc.data().status)
            })
          })

  await DB.collection('Orders')
          .where('clientId', '==', event.source.userId)
          .where('status', '==', 'paying')
          .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              allOrders.push(doc.data().status)
            })
          })

  console.log(allOrders)
          
  let status = allOrders.length <= 0 ? 'None' : allOrders.pop()
  return status

  /*
  console.log(orderSnapshot)

  let orderDocs = orderSnapshot.docs
  if (orderDocs.length <= 0) return "None"                      
  let currentOrderStatus = orderDocs[0].get('status')
  return currentOrderStatus
  */
}
