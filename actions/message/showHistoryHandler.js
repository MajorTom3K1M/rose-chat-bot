const DB = require('../../config/firebase.config')

module.exports = showHistoryHandler = async event => {
  const historyCollection = await DB.collection('Orders')
                                    .where('clientId', '==', event.source.userId)
                                    .where('status', '==', 'shipped')
                                    .limit(5)
                                    .get()
  
  msg = [{
    type: 'text',
    size: 'xl',
    text: 'Shipped Logs'
  }]
  let histories = historyCollection.docs
  for(i = 0; i < histories.length; i++) {
    msg.push({
      type: 'separator'
    })
    msg.push({
      type: 'text',
      text: "#" + (i+1) + " ORDER NO." + histories[i].id + ' was completely shipped with status ' + histories[i].get('status'),
      wrap: true
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
        spacing: 'sm',
        contents: msg
      }
    }
  }
}
