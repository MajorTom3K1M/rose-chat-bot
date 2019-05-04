const resolveOrderSnapshot = require('../../util/resolveOrderSnapshot')

const shippingHandler = (event) => {
  let msg = {
    type: 'text',
    text: "ได้รับสถานที่จัดส่งเรียบร้อยแล้วค่ะ ขอบคุณที่ใช้บริการคุณหนู Rose นะคะ สวัสดีค่ะ"
  }

  let order = resolveOrderSnapshot(event, 'shipping')

  order.then(result => result.update({status: "shipped"}))
  return msg
}

module.exports = shippingHandler