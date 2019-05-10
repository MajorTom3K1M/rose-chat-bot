const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', event.source.userId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  let userStatus = 'None'
  while(userOrderDocs.length > 0) {
    userStatus = userOrderDocs.pop().get('status')
    if(userStatus != 'shopping' && userStatus != 'paying') {
      userStatus = 'None'
    }
  }
  
  console.log(userStatus)
  return userStatus
}
