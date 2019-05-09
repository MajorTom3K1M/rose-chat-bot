module.exports = followEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    }

    if (includesSome(eventText, [''])) {
        return rudeWordHanlder(event)
    }

    return Promise.resolve(msg)
        .then(result => {
            console.log("messageEventHandler " + result)
            client.replyMessage(event.replyToken, result)
        })
}
