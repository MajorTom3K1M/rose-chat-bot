const DB = require('../../config/firebase.config')

module.exports = checkoutOrder = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  userOrderDocs.forEach(async order => {
    let userStatus = order.get('status')
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      await DB.collection('Orders')
              .doc(order.id)
              .set({shippedAt: toString(new Date())})
      await DB.collection('Orders')
              .doc(order.id)
              .update({status: 'shipped'})
    }
  })
}