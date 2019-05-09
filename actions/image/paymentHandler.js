const resolveOrderSnapshot = require('../util/resolveOrderByStatus')

module.exports = paymentHandler = async event => {
  resolveOrderSnapshot(event, 'paying')
    .then(result => result.update({status: "shipping"}))
    
  return msg = {
    type: 'text',
    text: "จ่ายเงินแล้วจร้า กรุณาระบุทีสถานที่จัดส่งผ่านการ share location ด้วยค่ะ"
  }
}