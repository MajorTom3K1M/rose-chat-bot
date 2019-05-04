const resolveOrderSnapshot = require('../../util/resolveOrderSnapshot')

const paymentHandler = async (event) => {
  let msg = {
    type: 'text',
    text: "จ่ายเงินแล้วจร้า กรุณาระบุทีสถานที่จัดส่งผ่านการ share location ด้วยค่ะ"
  }

  let order = resolveOrderSnapshot(event, 'paying')
              
  order.then(result => result.update({status: "shipping"}))
  return msg
}

module.exports = paymentHandler