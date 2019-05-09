const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async event => {
  const order = await DB.collection('Orders')
                        .where('clientId', '==', event.source.userId)
                        .where('status', '<', 'shipped').where('status', '>', 'shipped')
                        .where('status', '<', 'cancelled').where('status', '>', 'cancelled')
                        .get()

  let status = "None"

  order.then(doc => {
    if (!doc.exists) {
      console.log('No such document!')
    } 
    else {
      status = doc.data().status
    }
  })
  .catch(err => {
    console.log('Error getting document', err)
  })

  return status
}
