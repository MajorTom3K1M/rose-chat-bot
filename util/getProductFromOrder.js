const DB = require('../../config/firebase.config')

module.exports = async function getProductFromOrder(item, orderText) {
  let orderText = "รายการสั่งซื้อ #" + order.id + "\n"
  let totalPrice = 0
  let productPromise = await DB.collection('Product').get()
                  .then(querySnapshot => {
                    querySnapshot.docs
                      .find(doc => doc.id == item.id)
                        .data()
                  })

  productPromise.then(function(productPromise) {
    totalPrice += parseFloat(productPromise.price) * parseInt(item.qty)
    orderText += productPromise.title + " จำนวน " + item.qty + "\n"
  })

  return orderText += "ราคารวมทั้งหมด $" + totalPrice
}
