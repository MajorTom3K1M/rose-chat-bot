const DB = require('../../config/firebase.config')
var admin = require('firebase-admin');

module.exports = updateOrder = async (clientId, itemId) => {
  let productCollection = await DB.collection('Products')
                                  .doc(itemId)
                                  .get()
  let productQuantity = productCollection.get('quantity')

  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', clientId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  userOrderDocs.forEach(order => {
    let userStatus = order.get('status')
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      let itemList = order.get('items')
      let isUpdated = false
      for(i = 0; i < itemList.length; i++) {
        if(itemList[i].itemId === itemId) {
          if(parseInt(productQuantity) - parseInt(itemList[i].qty) <= 0) {
            return Promise.resolve(null)
          }
          itemList[i].qty += 1
          isUpdated = true
        }
      }
      if(isUpdated) {
        order.ref.update({ items: itemList })
      }
      else {
        if(parseInt(productQuantity) - 1 <= 0) {
          return Promise.resolve(null)
        }
        order.ref.update({
          items: admin.firestore.FieldValue.arrayUnion({
            itemId: itemId,
            qty: 1
          })
        })
      }
    }
  })
}
