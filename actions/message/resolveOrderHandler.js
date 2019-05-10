const DB = require('../../config/firebase.config')
const checkOrderHandler = require('./checkOrderHandler')
const checkoutOrder = require('../util/checkoutOrder')

module.exports = resolveOrderHandler = async event => {
  let msg = []
  msg.push(await checkOrderHandler(event))

  let paymentText = {
    type: 'text',
    text: "สามารถชำระเงินได้ที่ เลขบัญชี 1234567890 พร้อมทั้งส่งหลักฐานการโอนเงินเป็นภาพเข้ามาได้ผ่านทาง LINE นี้ได้เลยนะคะ"
  }
  msg.push(paymentText)

  await checkoutOrder(event)

  return msg
}