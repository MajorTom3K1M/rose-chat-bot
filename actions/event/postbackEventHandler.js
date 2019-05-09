const line = require('@line/bot-sdk');
const configLine = require('../../config/line.config')
const client = new line.Client(configLine);

const url = require('url');  
const querystring = require('querystring');

const createOrder = require('../util/createOrder')
const updateOrder = require('../util/updateOrder')

module.exports = postbackEventHandler = event => {
  let parsedUrl = url.parse(event.postback.data);  
  let params = querystring.parse(parsedUrl.query);

  let msg = {
    type: 'text',
    text: 'พี่กดปุ่มอะไรนะคะ หนูไม่เข้าใจค่ะ'
  }

  switch(params.action) {
    case 'createorder':
      await createOrder(params.clientId, params.items)
      break
    case 'updateorder':
      await updateOrder(params.clientId, params.items)
      break
  }

  return Promise.resolve(msg)
                .then(result => { client.replyMessage(event.replyToken, result) })
}