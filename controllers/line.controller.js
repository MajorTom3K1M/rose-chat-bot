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

async function handleMessageEvent(event) {
    var eventText = event.message.text.toLowerCase();

    if(eventText.includes('รายการสินค้า')) {

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
                        "data": "action=add&itemid="+doc.data().amount
                    },
                    {
                        "type": "uri",
                        "label": "View detail",
                        "uri": "http://example.com/page/"+doc.data().amount
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

    return client.replyMessage(event.replyToken, msg);
}

module.exports = {ConfigLine, handleEvent, handleMessageEvent};
