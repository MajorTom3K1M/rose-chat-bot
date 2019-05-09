const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = async (event) => {
  const orderSnapshot = await DB.collection('Orders');
  let orderKey = orderSnapshot.get()
                  .then(querySnapshot => {
                      querySnapshot.docs
                          .find(doc => {
                              doc.data().clientId == event.source.userId && doc.data().status != "shipped" && doc.data().status != "cancelled"
                          })
                  })
      
  return orderKey.then(result => result === undefined) ? "None" : orderKey.then(result => result.data().status)
}
