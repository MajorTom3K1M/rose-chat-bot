const DB = require('../config/firebase.config')

const resolveOrderSnapshot = async (event, status) => {
  const orderSnapshot = await DB.collection('Orders');
  let order = orderSnapshot.get()
                .then(querySnapshot => {
                  querySnapshot.docs
                    .find(doc => { 
                      doc.data().clientId === event.source.userId && doc.data().status === status 
                    })
                })
  return order
}

module.exports = resolveOrderSnapshot