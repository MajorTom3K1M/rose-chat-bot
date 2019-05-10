const showShoppingList = require('../util/showShoppingList')

module.exports = manageOrderHandler = async event => {
  let contentList = await showShoppingList(event)

  return msg = {
    type: 'flex',
    altText: 'Shopping List',
    contents: {
      type: 'carousel',
      contents: contentList
    }
  }
}
