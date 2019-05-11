const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async clientId => {
  let userOrderCollection = await DB.collection('Orders')
                                .where('clientId', '==', clientId)
                                .get()
  let userOrderDocs = userOrderCollection.docs
  let userStatus = 'None'
  for(i = 0; i < userOrderDocs.length; i++) {
    userStatus = userOrderDocs[i].get('status')
    if(userStatus === 'shopping' || userStatus === 'paying') {
      return userStatus
    }
  }
  
  return userStatus
}
