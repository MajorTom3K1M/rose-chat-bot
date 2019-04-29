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
    var eventText = event.message.text.toLowerCase();
    var msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ'
    };

    if(eventText.includes('รายการร้านค้า')) {
        msg = {
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                      "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                      "imageBackgroundColor": "#FFFFFF",
                      "title": "this is menu",
                      "text": "description",
                      "defaultAction": {
                          "type": "uri",
                          "label": "View detail",
                          "uri": "http://example.com/page/123"
                      },
                      "actions": [
                          {
                              "type": "postback",
                              "label": "Buy",
                              "data": "action=buy&itemid=111"
                          },
                          {
                              "type": "postback",
                              "label": "Add to cart",
                              "data": "action=add&itemid=111"
                          },
                          {
                              "type": "uri",
                              "label": "View detail",
                              "uri": "http://example.com/page/111"
                          }
                      ]
                    },
                    {
                      "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                      "imageBackgroundColor": "#000000",
                      "title": "this is menu",
                      "text": "description",
                      "defaultAction": {
                          "type": "uri",
                          "label": "View detail",
                          "uri": "http://example.com/page/222"
                      },
                      "actions": [
                          {
                              "type": "postback",
                              "label": "Buy",
                              "data": "action=buy&itemid=222"
                          },
                          {
                              "type": "postback",
                              "label": "Add to cart",
                              "data": "action=add&itemid=222"
                          },
                          {
                              "type": "uri",
                              "label": "View detail",
                              "uri": "http://example.com/page/222"
                          }
                      ]
                    }
                ],
                "imageAspectRatio": "rectangle",
                "imageSize": "cover"
            }
        }
    }
    return client.replyMessage(event.replyToken, msg);
}

module.exports = {config,handleEvent,handleMessageEvent};
