const DB = require('../../config/firebase.config')

module.exports = checkOrderHandler = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .where('status', '==', 'shopping')
                                    .get()

  let userOrderDocs = userOrderCollection.docs
  let orderId = userOrderDocs.pop().id
  let order = await DB.collection('Orders')
                      .doc(orderId)
                      .get()

  let totalPrice = 0
  let totalQuantity = 0
  let itemListContent = []
  let orderItems = order.data().items
  orderItems.forEach(item => {
    let itemObj = await DB.collection('Product').doc(item.itemId)
    totalQuantity += parseInt(item.qty)
    totalPrice += parseFloat(itemObj.get('price')) * parseInt(item.qty)
    itemListContent.push({
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: itemObj.get('title') + " x" + item.qty,
          size: 'sm',
          color: '#555555',
          flex: 0
        },
        {
          type: 'text',
          text: '$' + itemObj.get('price'),
          size: 'sm',
          color: '#111111',
          align: 'end'
        }
      ]
    })
  })

  itemListContent.push({
    type: 'separator',
    margin: 'xxl'
  },
  {
    type: 'box',
    layout: 'horizontal',
    margin: 'xxl',
    contents: [
      {
        type: 'text',
        text: 'QUANTITY',
        size: 'sm',
        color: '#555555'
      },
      {
        type: 'text',
        text: '' + totalQuantity,
        size: 'sm',
        color: '#111111',
        align: 'end'
      }
    ]
  },
  {
    type: 'box',
    layout: 'horizontal',
    contents: [
      {
        type: 'text',
        text: 'TOTAL PRICE',
        size: 'sm',
        color: '#555555'
      },
      {
        type: 'text',
        text: '$' + totalPrice,
        size: 'sm',
        color: '#111111',
        align: 'end'
      }
    ]
  })

  return msg = {
    type: 'flex',
    altText: 'Order',
    contents: {
      type: 'bubble',
      styles: {
        footer: {
          separator: true
        }
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: 'ตัวอย่างใบเสร็จ',
            weight: 'bold',
            color: '#1DB446',
            size: 'sm'
          },
          {
            type: 'text',
            text: 'ROSE\' Shop',
            weight: 'bold',
            size: 'xxl',
            margin: 'md'
          },
          {
            type: 'separator',
            margin: 'xxl'
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: itemListContent
          },
          {
            type: 'separator',
            margin: 'xxl'
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: 'ORDER ID',
                size: 'xs',
                color: '#aaaaaa',
                flex: 0
              },
              {
                type: 'text',
                text: '#' + orderId,
                color: '#aaaaaa',
                size: 'xs',
                align: 'end'
              }
            ]
          }
        ]
      }
    }
  }
}
