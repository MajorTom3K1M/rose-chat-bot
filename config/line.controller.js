const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: (process.env.channelAccessToken || "Qu5Ffzm+11X8Ebg57vTWcQLIk2jzj9k/nzT/vM5C6iJzFGCyeJB493nWjL4z4W1KaYEXrotpYAuTWQQfuQ9bJxo96pQPIt3T2zMZbvAu/hXm7kscRtjlihDCf7SBkRFtngykKb8GrV8mn0pWyOd4GAdB04t89/1O/w1cDnyilFU="),
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
        text: 'Hi , Friend'
    };
    return client.replyMessage(event.replyToken, msg);
}

module.exports = {config,handleEvent,handleMessageEvent};
