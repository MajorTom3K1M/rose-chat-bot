const handleMessageEvent = require('./event/messageEventHandler')
const followEventHandler = require('./event/followEventHandler')
const joinEventHandler = require('./event/joinEventHandler')
const postbackEventHandler = require('./event/postbackEventHandler')

module.exports = handleEvent = event => {

  console.log(event)

  switch(event.type) {
    case 'message': handleMessageEvent(event)
      break
    case 'follow': joinEventHandler(event)
      break
    case 'join': joinEventHandler(event)
      break
    case 'postback': postbackEventHandler(event)
      break
    default: return Promise.resolve(null);
  }
}

