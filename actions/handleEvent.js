const handleMessageEvent = require('./event/messageEventHandler')
const followEventHandler = require('./event/followEventHandler')

const handleEvent = event => {

  console.log(event)

  switch(event.type) {
    case 'message': handleMessageEvent(event)
      break
    case 'follow': followEventHandler(event)
      break
    case 'join': followEventHandler(event)
      break
    case 'postback': followEventHandler(event)
      break
    default: return Promise.resolve(null);
  }
}

module.exports = handleEvent