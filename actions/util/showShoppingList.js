const DB = require('../../config/firebase.config')

module.exports = showShoppingList = async (event, actionName) => {
  let productsCollection = await DB.collection('Products').get()
  let contentList = []
  
  productsCollection.forEach(doc => {
    let footerStyle = (doc.data().quantity > 0) ? 'primary' : 'secondary'
    let buttonText = (doc.data().quantity > 0) ? 'ใส่ตะกร้า' : 'สินค้าหมดค่ะ'
    let actionQs = (doc.data().quantity > 0) ? ('?action=' + actionName + '&items=' + doc.id + '&clientId=' + event.source.userId) : ''
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
            text: 'เหลือ ' + doc.data().quantity + ' ชิ้น'
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
            style: footerStyle,
            action: {
              type: 'postback',
              label: buttonText,
              data: actionQs
            }
          }
        ]
      }     
    })
  })

  return contentList
}