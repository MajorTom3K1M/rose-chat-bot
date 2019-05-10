const line = require('@line/bot-sdk');
const configLine = require('../../config/line.config')
const client = new line.Client(configLine);

const url = require('url');  
const querystring = require('querystring');

const manageOrder = require('../util/manageOrder')

module.exports = postbackEventHandler = async event => {
  let parsedUrl = url.parse(event.postback.data);  
  let params = querystring.parse(parsedUrl.query);

  let msg = {
    type: 'text',
    text: 'พี่กดปุ่มอะไรอะ หนูไม่เข้าใจ'
  }

  switch(params.action) {
    case 'manageorder':
      await manageOrder(params.clientId, params.items)
      msg = [
        {
          type: 'text',
          text: 'ขอบคุณที่ซื้อนะเจ้าคะ'
        },
        {
          type: 'sticker',
          packageId: '11537',
          stickerId: '52002742'
        },
        {
          type: 'text',
          text: 'หากต้องการชำระเงินให้พิมพ์ \'ชำระเงิน\' ได้เลยค่ะ'
        },
        {
          type: 'text',
          text: 'หากต้องการตรวจสอบตะกร้าสินค้า ให้พิมพ์ \'ตะกร้า\' ค่ะ'
        }
      ]
      break
  }

  return Promise.resolve(msg)
                .then(result => { client.replyMessage(event.replyToken, result) })
}