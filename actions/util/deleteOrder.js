const DB = require('../../config/firebase.config')

module.exports = deleteOrder = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  userOrderDocs.forEach(order => {
    let userStatus = order.get('status')
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      await DB.collection('Orders')
              .doc(order.id)
              .update({status: 'cancelled'})
    }
  })
}