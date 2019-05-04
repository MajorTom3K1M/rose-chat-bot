const DB = require('../config/firebase.config')

const showHistoryHandler = (event) => {
  const orderSnapshot = await DB.collection('Orders');
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
    
  let msg = {
    type: 'text',
    text: historyText
  };

  return msg
}

module.exports = showHistoryHandler