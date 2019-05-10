const DB = require('../../config/firebase.config')

module.exports = showHistoryHandler = async event => {
  const historyCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .where('status', '==', 'shipped')
                                    .get()
  
  msg = []

  

  return msg = {
    type: 'text',
    text: historyText
  }
}
