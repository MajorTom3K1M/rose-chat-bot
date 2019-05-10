const DB = require('../../config/firebase.config')

module.exports = createOrder = async (clientId, items) => {
  let productQuantity = await DB.collection('Products')
                                  .doc(items)
                                  .get('quantity')
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
        createdTime: toString(new Date())
      }
    ).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    }).catch((err) => {
        console.error("Error adding document: ", err);
    })
  }
}