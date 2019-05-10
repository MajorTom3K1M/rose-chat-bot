const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async clientId => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', clientId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  let userStatus = 'None'
  while(userOrderDocs.length > 0) {
    userStatus = userOrderDocs.pop().get('status')
    if(userStatus != 'shopping' && userStatus != 'paying') {
      userStatus = 'None'
    }
  }
  
  return userStatus
}
