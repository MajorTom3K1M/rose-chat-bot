const handleMessageEvent = require('../messageEventHandler')
const followEventHandler = require('../followEventHandler')
const unfollowEventHandler = require('../unfollowEventHandler')

const handleEvent = event => {

  console.log(event)

  if (event.type === 'message') {
    handleMessageEvent(event);
  }
  /*
  else if (event.type === 'memberJoined') {

  }
  else if (event.type === 'leave') {

  }
  else if (event.type === 'postback') {
    
  }
  */
  else if (event.type === 'follow') {
    followEventHandler(event);
  }
  else if (event.type === 'unfollow') {
    unfollowEventHandler(event);
  }
  else {
    return Promise.resolve(null);
  }
}

module.exports = handleEvent
