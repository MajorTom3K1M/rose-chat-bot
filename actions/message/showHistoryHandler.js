const DB = require('../../config/firebase.config')

module.exports = showHistoryHandler = async event => {
  const historyCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .where('status', '==', 'shipped')
                                    .orderBy('shippedDate')
                                    .limit(5)
                                    .get()
  
  msg = []

  let histories = historyCollection.docs
  for(i = 0; i < histories.length; i++) {
    msg.push({
      type: ''
    })
  }
  

  return msg = {
    type: 'text',
    text: historyText
  }
}
