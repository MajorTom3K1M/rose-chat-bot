const getProductFromOrder = require('../util/getProductFromOrder')

module.export = checkOrderHandler = async event => {
  return msg = {
      type: 'text',
      text: await getProductFromOrder(event)
  }
}
