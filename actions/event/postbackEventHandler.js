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
      msg = {
        type: 'text',
        text: 'ขอบคุณที่ซื้อนะเจ้าคะ หากต้องการชำระเงินให้พิมพ์ว่าชำระเงินได้เลยค่ะ'
      }
      break
  }

  return Promise.resolve(msg)
                .then(result => { client.replyMessage(event.replyToken, result) })
}