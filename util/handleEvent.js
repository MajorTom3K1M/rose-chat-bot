const handleMessageEvent = require('../controllers/line.controller')

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
      handleMessageEvent(event);
  } else {
      return Promise.resolve(null);
  }
}

module.exports = handleEvent