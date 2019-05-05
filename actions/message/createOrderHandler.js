const DB = require('../../config/firebase.config')

module.exports = createOrderHandler = async event => {
  let columns = []
  await DB.collection('Products').get()
    .forEach(doc => {
      columns.push({
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
      })
    })

  return msg = {
      type: "template",
      altText: "Shopping List",
      template: {
        type: "carousel",
        columns: columns
      }
  }
}
