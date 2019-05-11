const DB = require('../../config/firebase.config')

module.exports = checkoutOrder = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .get()

  let userOrderDocs = userOrderCollection.docs
  userOrderDocs.forEach(async order => {
    let userStatus = order.get('status')
    if(userStatus != 'cancelled' && userStatus != 'shipped') {
      let items = order.get('items')
      for(i = 0; i < items.length; i++) {
        let prodCol = await DB.collection('Products').doc(items[i].itemId).get()
        let oldQty = prodCol.get('quantity')
        let newQty = parseInt(oldQty) - parseInt(items[i].qty)
        console.log(parseInt(oldQty) - parseInt(items[i].qty))
        await DB.collection('Products')
                .doc(items[i].itemId)
                .update({quantity: newQty})
      }
      await DB.collection('Orders')
              .doc(order.id)
              .update({status: 'paying'})
    }
  })
}