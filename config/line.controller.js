const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: (process.env.channelAccessToken || "+IkMSSPWBisQNVlxH5ApmoYsFFHhBXBjSuRzfyqK58G7f0mMyKrzCCcBDxcu6ZNjHsGVomZ2sh0C9l6gwLyj/AgXJO/cEXyiv409SEJLdLSshI0POW28K/+rJcirj/A4QeU0n9UIzov9aQUMWmaWLQdB04t89/1O/w1cDnyilFU="),
    channelSecret: (process.env.channelSecret || "24fc5209a4b2c5c447498484291441c3")
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
