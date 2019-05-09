const resolveOrderStatus = require('../util/resolveOrderStatus')

module.exports = debugHandler = event => {
  contents = [{
    type: 'bubble',
    header: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'test'
        }
      ]
    },
    hero: {
      type: 'image',
      url: 'https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-9/60342575_316351512365799_2248730698775003136_o.jpg?_nc_cat=1&_nc_ht=scontent.fbkk5-6.fna&oh=d9ca97836e91c77a342cf063c60f203b&oe=5D741753',
      size: 'full',
      aspectMode: 'cover'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: 'ราคา ' + '999' + ' บาท'
        },
        {
          type: 'text',
          text: 'ยอดคงเหลือ ' + '10' + ' ชิ้น'
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
            data: 'action=createOrder&itemid=' + '0' + '&clientId=' + event.source.userId
          }
        }
      ]
    }     
  }]
  
  return msg = {
    type: "template",
    altText: "Shopping List",
    template: {
      type: "carousel",
      contents: contents
    }
  }
}