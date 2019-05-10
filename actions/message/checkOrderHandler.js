const DB = require('../../config/firebase.config')

module.exports = checkOrderHandler = async event => {
  let userOrderCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .where('status', '==', 'shopping')
                                    .get()

  let userOrderDocs = userOrderCollection.docs
  let orderId = userOrderDocs.pop().id

  let productMap = new Map()
  let productNameMap = new Map()

  let productCollection = await DB.collection('Products')
                                  .get()
  let productDocs = productCollection.docs

  console.log(productDocs[0])

  for(i = 0; i < productDocs.length; i++) {
    console.log(productDocs[i].id + " " + productDocs[i].get('price') + " " + productDocs[i].get('title'))
    productMap.set(productDocs[i].id, productDocs[i].get('price'))
    productNameMap.set(productDocs[i].id, productDocs[i].get('title'))
  }

  console.log(productMap)

  let order = await DB.collection('Orders')
                      .doc(orderId)
                      .get()

  let totalPrice = 0
  let totalQuantity = 0
  let itemListContent = []
  let orderItems = order.get('items')

  for(i = 0; i < orderItems.length; i++) {
    totalQuantity += parseInt(orderItems[i].qty)
    totalPrice += parseFloat(productMap.get(orderItems[i].itemId)) * parseInt(orderItems[i].qty)
    itemListContent.push({
      type: 'box',
      layout: 'horizontal',
      contents: [
        {
          type: 'text',
          text: productNameMap.get(orderItems[i].itemId) + " x" + orderItems[i].qty,
          size: 'sm',
          color: '#555555',
          wrap: true
        },
        {
          type: 'text',
          text: '$' + productMap.get(orderItems[i].itemId),
          size: 'sm',
          color: '#111111',
          align: 'end'
        }
      ]
    })
  }

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
            text: 'Rosé Shop',
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
