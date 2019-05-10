const DB = require('../../config/firebase.config')

module.exports = checkClientOrder = (client, event) => {
  await DB.collection('Orders')
          .where('clientId', '==', event.source.userId)
          .get()
          .then(docs => {
            if(docs.size == 0) {
              let msg = {
                type: 'text',
                text: 'None'
              }
              Promise.resolve(msg)
                        .then(result => { client.replyMessage(event.replyToken, result) })
            }
          })
}
