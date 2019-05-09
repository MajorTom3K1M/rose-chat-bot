const handleMessageEvent = require('../messageEventHandler')
const followEventHandler = require('../followEventHandler')
const unfollowEventHandler = require('../unfollowEventHandler')

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
