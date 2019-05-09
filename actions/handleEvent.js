const handleMessageEvent = require('./event/messageEventHandler')
const followEventHandler = require('./event/followEventHandler')
const unfollowEventHandler = require('./event/unfollowEventHandler')

const handleEvent = event => {

  console.log(event)

  switch(event.type) {
    case 'message': return handleMessageEvent(event)
    case 'follow': return followEventHandler(event)
    case 'join': return unfollowEventHandler(event)
    case 'postback': return unfollowEventHandler(event)
    default: return Promise.resolve(null);
  }
}

module.exports = handleEvent
