const resolveOrderSnapshot = require('../util/resolveOrderByStatus')

module.exports = paymentHandler = async event => {
  resolveOrderSnapshot(event, 'paying')
    .then(result => result.update({status: "shipping"}))
    
  return msg = {
    type: 'text',
    text: "ชำระเงินเสร็จสิ้นแล้วค่ะ ข่วยบอกสถานที่จัดส่งผ่านการ share location ด้วยนะคะ"
  }
}