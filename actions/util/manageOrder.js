const resolveOrderStatus = require('./resolveOrderStatus')
const createOrder = require('./createOrder')
const updateOrder = require('./updateOrder')

const DB = require('../../config/firebase.config')

module.exports = manageOrder = async (clientId, items) => {
  let status = await resolveOrderStatus(clientId)
  if(status === 'None') {
    await createOrder(clientId, items)
  }
  else {
    await updateOrder(clientId, items)
  }
}