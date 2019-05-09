module.exports = followEventHandler = event => {
    let msg = {
        type: 'text',
        text: 'ขอบคุณที่ติดตามหนูนะคะ'
    }

    return Promise.resolve(msg)
        .then(result => {
            console.log("follow" + result)
            client.replyMessage(event.replyToken, result)
        })
}
