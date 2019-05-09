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
        contents: [
          {
            type: 'text',
            text: doc.data().title
          }
        ]
      },
      hero: {
        type: 'image',
        url: doc.data().picture,
        size: 'full',
        aspectMode: 'cover'
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'ราคา ' + doc.data().price + ' บาท'
          },
          {
            type: 'text',
            text: 'ยอดคงเหลือ ' + doc.data().quantity + ' ชิ้น'
          }
        ]
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'button',
            style: 'primary',
            action: {
              type: 'postback',
              label: 'ใส่ตะกร้า',
              data: 'action=createOrder&itemid=' + doc.id + '&clientId=' + event.source.userId
            }
          }
        ]
      }     
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
