const DB = require('../config/firebase.config')

const updateOrderHandler = (event) => {
  const orderSnapshot = await DB.collection('Orders');

  let order = orderSnapshot.get()
                .then(querySnapshot => {
                  querySnapshot
                  .docs
                  .find(
                    (doc) => {
                      doc.data().clientId == event.source.userId && doc.data().status == "shopping"
                    })
                })

  let columns = []
  
  const productsSnapshot = await DB.collection('Products').get();
  productsSnapshot.forEach(doc => {
    let column = {
      thumbnailImageUrl: doc.data().picture,
      title: doc.data().title,
      text: "$" + doc.data().price + " (คงเหลือ " + doc.data().quantity + " ชิ้น)",
      actions: [
        {
          type: "postback",
          label: "Add to cart",
          data: "action=updateorder&itemid=" + doc.id + "&orderId=" + order.then(result => result.id)
        },
        {
          type: "uri",
          label: "View detail",
          uri: "https://blackpinkmerch.com/"
        }
      ]}
      columns.push(column)
    }
  )

  let msg = {
      type: "template",
      altText: "Shopping List",
      template: {
          type: "carousel",
          columns: columns
      }
  }
  return msg
}

module.exports = updateOrderHandler