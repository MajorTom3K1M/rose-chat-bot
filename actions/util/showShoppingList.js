const DB = require('../../config/firebase.config')

module.exports = showShoppingList = async (event) => {
  let productsCollection = await DB.collection('Products').get()
  let contentList = []
  productsCollection.forEach(doc => {
    if(doc.data().quantity > 0) {
      contentList.push({
        type: 'bubble',
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
              text: doc.data().title,
              wrap: true,
              weight: 'bold',
              size: 'lg'
            },
            {
              type: 'text',
              text: '$' + doc.data().price,
              size: 'xl'
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
              style: 'primary',
              action: {
                type: 'postback',
                label: 'ใส่ตะกร้า',
                data: '?action=manageorder&items=' + doc.id + '&clientId=' + event.source.userId
              }
            }
          ]
        }     
      })
    }
    else {
      contentList.push({
        type: 'bubble',
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
              text: doc.data().title,
              wrap: true,
              weight: 'bold',
              size: 'lg'
            },
            {
              type: 'text',
              text: '$' + doc.data().price,
              size: 'xl'
            },
            {
              type: 'text',
              text: 'หมดแล้วค่ะ T^T',
              color: '#ff5551',
              size: 'xs'
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
              style: 'secondary',
              action: {
                type: 'uri',
                label: 'ใส่ตะกร้า',
                uri: ''
              }
            }
          ]
        }     
      })
    }
    
  })

  return contentList
}