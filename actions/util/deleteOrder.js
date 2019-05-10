const DB = require('../../config/firebase.config')

module.exports = deleteOrder = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  while(userOrderDocs.length > 0) {
    order = userOrderDocs.pop()
    userStatus = order.get('status')
    orderId = order.id
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      await DB.collection('Orders')
              .doc(orderId)
              .update({status: 'cancelled'})
    }
  }
}