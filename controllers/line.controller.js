const line = require('@line/bot-sdk');
const { config } = require('./../config/line.config')
const DB = require('./../config/firebase.config')

const client = new line.Client(config);

function handleEvent(event) {
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function includesSome(text, wordList) {
    let isFound = false
    for (i in wordList) {
        if (text.includes(wordList[i])) {
            isFound = true
            break
        }
    }
    return isFound
}

async function handleMessageEvent(event) {
    let eventText = event.message.text.toLowerCase();

    if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
        let columns = []
        const noteSnapshot = await DB.collection('Products').get();
        noteSnapshot.forEach((doc) => {
            let column = {
                thumbnailImageUrl: doc.data().picture,
                title: doc.data().title,
                text: doc.data().price,
                actions: [
                    {
                        type: "postback",
                        label: "Add to cart",
                        data: "action=add&itemid=1"
                    },
                    {
                        type: "uri",
                        label: "View detail",
                        uri: "https://blackpinkmerch.com/"
                    }
                ]
            }
            columns.push(column)
        })
        let msg = {
            type: "template",
            altText: "Shopping List",
            template: {
                type: "carousel",
                columns: columns
            }
        }
        return client.replyMessage(event.replyToken, msg);
    }
    // rude word filter
    else if (includesSome(eventText, ['fuck', 'fuxk', 'ควย', 'สัส', 'เหี้ย', 'ชิบหาย', 'มึง', 'กู', 'เย็ด', 'เชี่ย', 'fu*k', 'ค ว ย', 'ห่า', 'หำ', 'หี', 'ระยำ'])) {
        let msg = {
            type: 'text',
            text: 'หนูดุนะ พี่ไหวหรอ'
        };
        return client.replyMessage(event.replyToken, msg);
    } else {
        // Default Reply Message
        let msg = {
            type: 'text',
            text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
        }
        return client.replyMessage(event.replyToken, msg);
    }
}

module.exports = { config, handleEvent, handleMessageEvent };
