const DB = require('../../config/firebase.config')

const createOrderHandler = async (event) => {
  const productsSnapshot = await DB.collection('Products').get();
  let columns = []
  productsSnapshot.forEach(doc => {
    let column = {
      thumbnailImageUrl: doc.data().picture,
      title: doc.data().title,
      text: "$" + doc.data().price + " (คงเหลือ " + doc.data().quantity + " ชิ้น)",
      actions: [
        {
          type: "postback",
          label: "Add to cart",
          data: "action=order&itemid=" + doc.id + "&clientId=" + event.source.userId
        },
        {
          type: "uri",
          label: "View detail",
          uri: "https://blackpinkmerch.com/"
        }
      ]
    }
    columns.push(column)
  })

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

module.exports = createOrderHandler