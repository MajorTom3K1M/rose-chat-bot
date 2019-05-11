const payOrder = require('../util/payOrder')

module.exports = paymentHandler = async event => {
  await payOrder(event)
  return msg = [
    {
      type: 'sticker',
      packageId: '11537',
      stickerId: '52002759'
    },
    {
      type: 'text',
      text: 'ชำระเงินเสร็จสิ้นแล้วค่ะ ข่วยบอกสถานที่จัดส่งผ่านการ share location ด้วยนะคะ'
    },
    {
      type: 'flex',
      altText: 'xxxxx',
      contents: {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: 'Destination Address'
            },
            {
              type: 'button',
              style: 'primary',
              action: {
                type: 'location',
                label: 'Location'
              }
            }
          ]
        }
      }
    }
  ]
}