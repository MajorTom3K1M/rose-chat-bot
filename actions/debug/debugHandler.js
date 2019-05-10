const resolveOrderStatus = require('../util/resolveOrderStatus')

module.exports = debugHandler = async event => {
  resolveOrderStatus(event, status).then(event, status => {
    return msg = {
      type: 'text',
      text: status 
    }
  })
}