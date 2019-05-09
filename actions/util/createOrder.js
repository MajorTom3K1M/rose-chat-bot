const DB = require('../../config/firebase.config')

module.exports = createOrder = async (clientId, items) => {
  await DB.collection('Orders').add({
    clientId: clientId,
    items: [
      {
        itemId: items,
        qty: 1
      }
    ],
    status: "shopping"
  }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      let respone = { status: true }
      res.status(200).json(respone)
  }).catch((err) => {
      console.error("Error adding document: ", err);
      let respone = { status: false }
      res.status(200).json(respone)
  })
}