const payOrder = require('../util/payOrder')

module.exports = paymentHandler = async event => {
  await payOrder(event)
  return msg = [
    {

    },
    {
      type: 'flex',
      altText: 'Shopping List',
      contents: {
        type: 'carousel',
        contents: [
          {
            type: 'text',
            text: "ชำระเงินเสร็จสิ้นแล้วค่ะ ข่วยบอกสถานที่จัดส่งผ่านการ share location ด้วยนะคะ"
          },
          {
            type: 'button',
            style: "link",
            action: {
              type: 'location',
              label: 'Location'
            }
          }
        ]
      }
    }
  ]
}