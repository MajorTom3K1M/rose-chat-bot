const line = require('@line/bot-sdk');
const ConfigLine  = require('./../config/line.config')
const DB = require('./../config/firebase.config')

const client = new line.Client(ConfigLine);

function handleEvent(event) {
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function includesSome(text, wordList) {
    console.log('hi')
    let isFound = false
    for (i in wordList) {
        if (text.includes(wordList[i])) {
            isFound = true
            break
        }
    }
    console.log('bye')
    return isFound
}

async function handleMessageEvent(event) {
    var eventText = event.message.text.toLowerCase();

    // Default Reply Message
    var msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    };

    return client.replyMessage(event.replyToken, msg);
}

module.exports = {ConfigLine, handleEvent, handleMessageEvent};
