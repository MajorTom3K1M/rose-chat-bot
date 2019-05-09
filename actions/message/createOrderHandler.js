const showShoppingList = require('../util/showShoppingList')

module.exports = createOrderHandler = async event => {
  let contentList = await showShoppingList(event, "createorder")

  return msg = {
    type: 'flex',
    altText: 'Shopping List',
    contents: {
      type: 'carousel',
      contents: contentList
    }
  }
}
