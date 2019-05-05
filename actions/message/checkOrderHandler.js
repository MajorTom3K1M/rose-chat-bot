const resolveOrderSnapshot = require('../../util/resolveOrderSnapshot')
const getProductFromOrder = require('../../util/getProductFromOrder')

module.export = checkOrderHandler = event => {
  let orderPromise = resolveOrderSnapshot(event, 'shopping')
    .then(result => result.data().items)
    .then(forEach(item => getProductFromOrder(item)))

  return msg = {
      type: 'text',
      text: orderPromise.then(value => value)
  }
}
