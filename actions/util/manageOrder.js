const resolveOrderStatus = require('./resolveOrderStatus')
const createOrder = require('./createOrder')
const updateOrder = require('./updateOrder')

module.exports = manageOrder = async (clientId, items) => {
  let status = await resolveOrderStatus(clientId)
  if(status === 'None') {
    console.log('create')
    await createOrder(clientId, items)
  }
  else {
    console.log('update')
    await updateOrder(clientId, items)
  }
}