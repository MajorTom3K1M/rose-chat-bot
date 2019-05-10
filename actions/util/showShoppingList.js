const DB = require('../../config/firebase.config')

module.exports = showShoppingList = async (event) => {
  let productsCollection = await DB.collection('Products').get()
  let contentList = []
  productsCollection.forEach(doc => {
    if(parseInt(doc.data().quantity) > 0) {
      contentList.push({
        type: 'bubble',
        hero: {
          type: 'image',
          url: doc.data().picture,
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '20:13'
        },
        body: {
          type: 'box',
          layout: 'vertical',
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
              text: 'ยอดสินค้าคงเหลือ ' + doc.data().quantity + ' ชิ้น'
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
          aspectMode: 'cover',
          aspectRatio: '20:13'
        },
        body: {
          type: 'box',
          layout: 'vertical',
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
                uri: 'https://blackpinkmerch.com/'
              }
            }
          ]
        }     
      })
    }
    
  })

  return contentList
}