const DB = require('../../config/firebase.config')

const cancelOrderHandler = async (event) => {
  const orderSnapshot = await DB.collection('Orders');

  let order = orderSnapshot.get()
                .then(querySnapshot => {
                  querySnapshot.docs
                    .find(doc => { 
                      doc.data().clientId == event.source.userId && doc.data().status == "shopping" 
                    })
                })

  order.then(result => result.update({status: "cancelled"}))
  return msg
}

module.exports = cancelOrderHandler