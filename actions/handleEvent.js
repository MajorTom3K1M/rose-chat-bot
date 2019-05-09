const handleMessageEvent = require('./event/messageEventHandler')
const followEventHandler = require('./event/followEventHandler')

const handleEvent = event => {

  console.log(event)

  switch(event.type) {
    case 'message': handleMessageEvent(event)
    case 'follow': followEventHandler(event)
    case 'join': followEventHandler(event)
    case 'postback': followEventHandler(event)
    default: return Promise.resolve(null);
  }
}

module.exports = handleEvent
