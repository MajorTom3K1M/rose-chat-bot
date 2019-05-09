const DB = require('../../config/firebase.config')

module.exports = createOrderHandler = async event => {
  let productsCollection = await DB.collection('Products').get()

  let contentList = []
  productsCollection.forEach(doc => {
    contentList.push({
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'doc.data().title'
          }
        ]
      },
      hero: {
        type: 'image',
        url: doc.data().picture,
        size: 'full',
        aspectRatio: '2:1'
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
        spacing: 'md',
        contents: [
          {
            type: 'button',
            style: 'primary',
            action: {
              type: 'postback',
              label: 'ใส่ตะกร้า',
              data: 'action=createorder&itemId=' + doc.id + '&clientid=' + event.source.userId,
              text: 'ใส่ตะกร้า'
            }
          }
        ]
      }     
    })
  })

  return msg = {
    type: 'carousel',
    contents: contentList
  }
}
