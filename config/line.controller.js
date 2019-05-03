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

function includesSome(text, list) {
    list.map((item) => {
        if(text.includes(item)) {
            return true
        }
    })
    return false
}

function handleMessageEvent(event) {
    var eventText = event.message.text.toLowerCase();
    console.log(eventText);

    // Default Reply Message
    var msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    };

    if(includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
        msg = {
            "type": "template",
            "altText": "Shopping List",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
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
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "this is menu",
                        "text": "description",
                        "actions": [
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
                ]
            }
        }
    }


    return client.replyMessage(event.replyToken, msg);
}

module.exports = {config, handleEvent, handleMessageEvent};
