const showShoppingList = require('../util/showShoppingList')

module.exports = updateOrderHandler = async event => {
  let contentList = await showShoppingList(event, "updateorder")

  return msg = {
    type: 'flex',
    altText: 'Shopping List',
    contents: {
      type: 'carousel',
      contents: contentList
    }
  }
}
