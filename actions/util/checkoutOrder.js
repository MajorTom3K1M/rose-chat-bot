const DB = require('../../config/firebase.config')

module.exports = checkoutOrder = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  userOrderDocs.forEach(async order => {
    let userStatus = order.get('status')
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      let items = order.get('items')
      for(i = 0; i < items.length; i++) {
        await DB.collection('Products')
                .doc(items[0].itemId)
                .update({quantity: firebase.firestore.FieldValue.increment(-1)})
      }
      await DB.collection('Orders')
              .doc(order.id)
              .update({status: 'paying'})
    }
  })
}