const DB = require('../../config/firebase.config')
const admin = require('firebase-admin');

module.exports = updateOrder = async (event, itemId) => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  userOrderDocs.forEach(order => {
    let userStatus = order.get('status')
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      order.forEach(async doc => {
          let index = doc.data().items.findIndex(item => itemId === item.itemId)
          let item = doc.data().items[index]
          await DB.collection('Orders')
                  .doc(doc.id)
                  .update({items: [
                    ...doc.data().items.slice(0, index),
                    { ...item, 
                      qty: Number(item.qty) + 1
                    },
                    ...doc.data().items.slice(index + 1)
                ]})
      })
    }
  })
}