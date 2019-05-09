const url = require('url');  
const querystring = require('querystring');

const createOrder = require('../util/createOrder')
const updateOrder = require('../util/updateOrder')

module.exports = postbackEventHandler = event => {
  let parsedUrl = url.parse(event.postback.data);  
  let params = querystring.parse(parsedUrl.query);

  switch(params.action) {
    case 'createorder':
      createOrder(params.clientId, params.items)
      break
    case 'updateorder':
      updateOrder(params.clientId, params.items)
      break
  }
}