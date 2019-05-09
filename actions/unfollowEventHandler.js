module.exports = unfollowEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'ไม่นะ จะไม่ติดตามหนูแล้วจริงๆ หรอ TT'
    }

    return Promise.resolve(msg)
        .then(result => {
            console.log("messageEventHandler " + result)
            client.replyMessage(event.replyToken, result)
        })
}
