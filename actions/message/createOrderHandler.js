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
            text: doc.data().title,
            wrap: true,
            weight: 'bold'
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
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text: '$' + doc.data().price,
            size: 'lg'
          },
          {
            type: 'separator'
          },
          {
            type: 'text',
            text: 'ยอดคงเหลือ\n' + doc.data().quantity + ' ชิ้น'
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
              data: 'action=createorder&items=' + doc.id + '&clientId=' + event.source.userId
            }
          }
        ]
      }     
    })
  })

  return msg = {
    type: 'flex',
    altText: 'Shopping List',
    contents: {
      type: 'carousel',
      contents: contentList
    }
  }
}
