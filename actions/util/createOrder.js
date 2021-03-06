const DB = require('../../config/firebase.config')

module.exports = createOrder = async (clientId, items) => {
  let productCollection = await DB.collection('Products')
                                  .doc(items)
                                  .get()
  let productQuantity = productCollection.get('quantity')
  console.log("qty " + parseInt(productQuantity))

  if(parseInt(productQuantity) > 0) {
    await DB.collection('Orders').add(
      {
        clientId: clientId,
        items: [
          {
            itemId: items,
            qty: 1,
          }
        ],
        status: "shopping",
        createdTime: new Date()
      }
    ).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    }).catch((err) => {
        console.error("Error adding document: ", err);
    })
  }
}