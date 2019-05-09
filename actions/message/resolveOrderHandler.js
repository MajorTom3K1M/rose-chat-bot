const DB = require('../../config/firebase.config')
const resolveOrderSnapshot = require('../util/resolveOrderByStatus')

module.exports = resolveOrderHandler = async event => {
  let order = resolveOrderSnapshot(event, 'shopping')

  let paymentText = "รายการสั่งซื้อ #" + order.id + "\n"
  let totalPrice = 0

  let noteSnapshot = DB.collection('Product')
  order.then(result => result.data()
                        .items
                        .forEach(item => {
                          let product = noteSnapshot.get()
                                          .then(querySnapshot => {
                                            querySnapshot.docs.find(doc => {
                                              doc.id == item.id
                                            }).data()
                                          })
                          totalPrice += parseFloat(product.then(result => result.price)) * parseInt(item.qty)
                          paymentText += product.title + " จำนวน " + item.qty + "\n"
                        }))

  paymentText += "ราคารวมทั้งหมด $" + totalPrice + "\n\n"
  paymentText += "สามารถชำระเงินได้ที่ เลขบัญชี xxxxxxxxxxx พร้อมทั้งส่งหลักฐานการโอนเงินเข้ามาได้ผ่านทาง LINE นี้"
  
  let msg = {
      type: 'text',
      text: paymentText
  }

  order.then(result => result.update({status: "playing"}))

  return msg
}