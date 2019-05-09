const handleMessageEvent = require('./event/messageEventHandler')
const followEventHandler = require('./event/followEventHandler')

const handleEvent = event => {

  console.log(event)

  switch(event.type) {
    case 'message': return handleMessageEvent(event)
    case 'follow': return followEventHandler(event)
    case 'join': return followEventHandler(event)
    case 'postback': return followEventHandler(event)
    default: return Promise.resolve(null);
  }
}

module.exports = handleEvent
