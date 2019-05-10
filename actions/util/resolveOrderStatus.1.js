const DB = require('../../config/firebase.config')

module.exports = resolveOrderStatus = (client, event, status) => {
  await DB.collection('Orders')
          .where('clientId', '==', event.source.userId)
          .where('status', '==', status)
          .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
              let msg = {
                type: 'text',
                text: doc.get('status')
              }
              Promise.resolve(msg)
                        .then(result => { client.replyMessage(event.replyToken, result) })
            })
          })
}
