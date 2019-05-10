const deleteOrder = require('../util/deleteOrder')

module.exports = cancelOrderHandler = async event => {
  await deleteOrder(event)
  return msg = [
    {
      type: 'text',
      text: 'ยกเลิกรายการปัจจุบันแล้วนะเจ้าคะ'
    },
    {
      type: 'sticker',
      packageId: '11537',
      stickerId: '52002740'
    }
  ]
}
