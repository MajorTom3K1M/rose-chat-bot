const shipOrder = require('../util/shipOrder')

module.exports = shippingHandler = async event => {
  await shipOrder(event)

  return msg = [
    {
      type: 'text',
      text: "ได้รับสถานที่จัดส่งเรียบร้อยแล้วค่ะ ขอบคุณที่ใช้บริการคุณหนู Rose นะคะ สวัสดีค่ะ"
    },
    {
      type: 'sticker',
      packageId: '11539',
      stickerId: '52114128'
    }
  ]
}