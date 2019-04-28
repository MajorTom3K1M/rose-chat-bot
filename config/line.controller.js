const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: (process.env.channelAccessToken || "JtnZ4tiXAhiJ0jI6Qc1zgWO50aoV/9ui1Kpekakk/i5xmRbgW4yFPexy3PEv7Gm8aYEXrotpYAuTWQQfuQ9bJxo96pQPIt3T2zMZbvAu/hWnZB4Oqox8tMW8Az3xAjKGR1j6XClorkwPLto82cN+TQdB04t89/1O/w1cDnyilFU="),
    channelSecret: (process.env.channelSecret || "7e11260ef38889493c9bc7d212aa9866")
};

const client = new line.Client(config);

function handleEvent(event) {
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'Hi, Friend'
    };
    return client.replyMessage(event.replyToken, msg);
}

module.exports = {config, handleEvent, handleMessageEvent};
