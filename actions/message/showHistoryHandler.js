const DB = require('../../config/firebase.config')

module.exports = showHistoryHandler = async event => {
  const historyCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .where('status', '==', 'shipped')
                                    .limit(5)
                                    .get()
  
  msg = []
  let histories = historyCollection.docs
  for(i = 0; i < histories.length; i++) {
    msg.push({
      type: 'text',
      text: "#" + (i+1) + " ORDER NO." + histories[i].id + ' was completely shipped at ' + histories[i].get('shippedTime'),
      wrap: true
    })
    msg.push({
      type: 'separator'
    })
  }
  
  return msg = {
    type: 'flex',
    altText: 'Shopping List',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: msg
      }
    }
  }
}
