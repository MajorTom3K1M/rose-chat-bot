const DB = require('../../config/firebase.config')

module.exports = createOrder = (clientId, items) => {
  DB.collection('Orders').add({
    clientId: clientId,
    items: items,
    status: "shopping"
  }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      let respone = { status: true }
      res.status(200).json(respone)
  }).catch((err) => {
      console.error("Error adding document: ", error);
      let respone = { status: false }
      res.status(200).json(respone)
  })
}