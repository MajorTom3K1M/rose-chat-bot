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

async function includesSome(text, wordList) {
    var isFound = false
    for (i in wordList) {
        if (text.includes(wordList[i])) {
            isFound = true
            break
        }
    }
    return isFound
}

async function handleMessageEvent(event) {
    var eventText = event.message.text.toLowerCase();

    // Default Reply Message
    var msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    };

    if(includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
        let columns = []
        const noteSnapshot = await DB.collection('Products').get();
        noteSnapshot.forEach(async (doc) => {
            let column =  {
                thumbnailImageUrl: doc.data().picture,
                title: doc.data().title,
                text: "description",
                "actions": [
                    {
                        "type": "postback",
                        "label": "Add to cart",
                        "data": "action=add&itemid="+doc.id
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/"+doc.id
                    }
                ]
            }
            columns.push(column)
        })
        msg = {
            type: "template",
            altText: "Shopping List",
            template: {
                "type": "carousel",
                "columns": columns
            }
        }
    }
    // rude word filter
    else if(includesSome(eventText, ['fuck', 'fuxk', 'ควย', 'สัส', 'เหี้ย', 'ชิบหาย', 'มึง', 'กู', 'เย็ด', 'เชี่ย', 'fu*k', 'ค ว ย', 'ห่า', 'หำ', 'หี', 'ระยำ'])) {
        msg = {
            type: 'text',
            text: 'หนูดุนะ พี่ไหวหรอ'
        };
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = {ConfigLine, handleEvent, handleMessageEvent};
