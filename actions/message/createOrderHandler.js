const DB = require('../../config/firebase.config')

module.exports = createOrderHandler = async event => {
  let productsCollection = await DB.collection('Products').get()

  let contents = []
  productsCollection.forEach(doc => {
    contents.push({
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: {
          type: 'text',
          text: doc.data().title
        }
      },
      body: {
        type: 'image',
        url: doc.data().picture,
        size: 'full',
        aspectRatio: '2:1'
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: {
          type: 'text',
          text: "$" + doc.data().price + " (คงเหลือ " + doc.data().quantity + " ชิ้น)"
        }
      },      
    })
  })

  return msg = {
    type: "template",
    altText: "Shopping List",
    template: {
      type: "carousel",
      contents: contents
    }
  }
}
