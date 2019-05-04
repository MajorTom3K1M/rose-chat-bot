const DB = require('../../config/firebase.config')

const paymentHandler = async (event) => {
  const orderSnapshot = await DB.collection('Orders');

  let msg = {
    type: 'text',
    text: "จ่ายเงินแล้วจร้า กรุณาระบุทีสถานที่จัดส่งผ่านการ share location ด้วยค่ะ"
  }

  let order = orderSnapshot.get()
              .then(querySnapshot => {
                querySnapshot.docs.find(
                  (doc) => {
                     doc.data().clientId == event.source.userId && doc.data().status == "paying" 
                  })
              })
              
  order.then(result => result.update({status: "shipping"}))
  return msg
}

module.exports = paymentHandler