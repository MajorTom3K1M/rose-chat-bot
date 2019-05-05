const DB = require('../../config/firebase.config')

module.exports = showHistoryHandler = async event => {
  const orderSnapshot = await DB.collection('Orders')
  let history = orderSnapshot.get()
                  .then(querySnapshot => {
                    querySnapshot.docs
                      .filter(doc => { 
                        doc.data().clientId == event.source.userId && doc.data().status == "shipped" 
                      })
                  })

  let historyText = "ประวัติการสั่งซื้อของท่านทั้งหมด"
  history.then(result => result.forEach(history => {
                                          historyText += history.id + "\n"
                                        })
              )

  return msg = {
    type: 'text',
    text: historyText
  }
}
