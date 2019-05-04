const DB = require('../config/firebase.config')

const checkOrderHandler = (event) => {
  const orderSnapshot = await DB.collection('Orders');
  let order = orderSnapshot.get()
                .then(querySnapshot => {
                  querySnapshot.docs
                    .find(doc => { 
                      doc.data().clientId == event.source.userId && doc.data().status == "shopping" 
                    })
                })

  let orderText = "รายการสั่งซื้อ #" + order.id + "\n"
  let totalPrice = 0
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
                        orderText += product.title + " จำนวน " + item.qty + "\n"
                      })
            )

  orderText += "ราคารวมทั้งหมด $" + totalPrice

  let msg = {
      type: 'text',
      text: orderText
  };

  return msg
}

module.exports = checkOrderHandler