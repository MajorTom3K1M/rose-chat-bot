const DB = require('../../config/firebase.config')

module.exports = createOrderHandler = async event => {
  let productsCollection = await DB.collection('Products').get()

  console.log(productsCollection)

  let contentList = []

  productsCollection.forEach(doc => {
    let column = {
      thumbnailImageUrl: doc.data().picture,
      title: doc.data().title,
      text: "$" + doc.data().price + " (คงเหลือ " + doc.data().quantity + " ชิ้น)",
      actions: [
        {
          type: "postback",
          label: "Add to cart",
          data: "action=createOrder&itemid=" + doc.id + "&clientId=" + event.source.userId
        },
        {
          type: "uri",
          label: "View detail",
          uri: "https://blackpinkmerch.com/"
        }
      ]
    }
    contentList.push(column)
  })

  console.log(contentList)

  return msg = {
    type: 'template',
    altText: "Shopping List",
    template: {
      type: "carousel",
      contents: contentList
    }
  }
}
