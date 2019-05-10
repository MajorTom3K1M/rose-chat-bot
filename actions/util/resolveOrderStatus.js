const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  let userStatus = userOrderDocs.pop().get('status')
  console.log(userStatus)
  return userStatus === undefined ? 'None' : userStatus
}
