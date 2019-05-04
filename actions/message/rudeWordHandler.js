const DB = require('../config/firebase.config')

const showHistoryHandler = (event) => {
  let msg = {
    type: 'text',
    text: 'หนูดุนะ พี่ไหวหรอ'
  };

  return msg
}

module.exports = showHistoryHandler