const DB = require('../../config/firebase.config')

module.exports = getProductFromOrder = async orderId => {
  let orderText = "รายการสั่งซื้อ #" + orderId + "\n"
  let totalPrice = 0

  let productCollection = await DB.collection('Product')
                                  .get()
                                  
  let productList = productCollection.docs
  let productMap = new Map()
  productList.forEach(product => {
    productMap.set(key=product.id, product.data().price)
  })
  let productNameMap = new Map()
  productList.forEach(product => {
    productNameMap.set(key=product.id, product.data().title)
  })

  let order = await DB.collection('Orders')
                      .doc(orderId)
                      .get()
  let orderItems = order.data().items
  orderItems.forEach(item => {
    totalPrice += parseFloat(productMap.get(item.itemId)) * parseInt(item.qty)
    orderText += productNameMap.get(item.itemId) + " จำนวน " + item.qty + "\n"
  })

  return orderText += "ราคารวมทั้งหมด $" + totalPrice
}
