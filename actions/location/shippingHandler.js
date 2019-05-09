const resolveOrderSnapshot = require('../util/resolveOrderByStatus')

module.exports = shippingHandler = event => {
  resolveOrderSnapshot(event, 'shipping')
    .then(result => result.update({status: "shipped"}))
    
  return msg = {
    type: 'text',
    text: "ได้รับสถานที่จัดส่งเรียบร้อยแล้วค่ะ ขอบคุณที่ใช้บริการคุณหนู Rose นะคะ สวัสดีค่ะ"
  }
}