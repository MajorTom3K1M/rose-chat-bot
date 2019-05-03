const line = require('@line/bot-sdk');
const  configLine  = require('./../config/line.config')
const DB = require('./../config/firebase.config')

const client = new line.Client(configLine);

function handleEvent(event) {
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
    const noteSnapshot = await DB.collection('Products').get();
    const orderSnapshot = await DB.collection('Orders').get();
    let orderKey = orderSnapshot.then(querySnapshot => {
        querySnapshot.docs.find((doc) => {
            doc.data().clientId == event.source.userId && doc.data().status != "shipped" && doc.data().status != "cancelled"
        })
    })
    let orderStatus = orderKey.data().status != undefined ? orderKey.data().status : "None"
    console.log(orderStatus)

    // Default Reply Message
    let msg = {
        type: 'text',
        text: 'หนูไม่เข้าใจค่ะ ช่วยพิมพ์ใหม่ให้หนูอีกครั้งนะคะ'
    }

    switch(orderStatus) {
        case "paying":
            // TODO: WIP (Use text in real version)
            if (event.message.type === "sticker") {
                msg = {
                    type: 'text',
                    text: "จ่ายเงินแล้วจร้า กรุณาระบุทีสถานที่จัดส่งผ่านการ share location ด้วยค่ะ"
                };
                order.update({status: "shipping"})
            }
            break;
        case "shipping":
            // TODO: WIP 
            if (event.message.type === "location") {
                msg = {
                    type: 'text',
                    text: "ได้รับสถานที่จัดส่งเรียบร้อยแล้วค่ะ ขอบคุณที่ใช้บริการคุณหนู Rose นะคะ สวัสดีค่ะ"
                }
                order.update({status: "shipped"})
            }
            break;
        case "shopping":
            if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
                let order = orderSnapshot.then(querySnapshot => {
                    querySnapshot.docs.find((doc) => { doc.data().clientId == event.source.userId && doc.data().status == "shopping" })
                })
                let columns = []
                noteSnapshot.forEach((doc) => {
                    let column = {
                        thumbnailImageUrl: doc.data().picture,
                        title: doc.data().title,
                        text: "$" + doc.data().price + " (คงเหลือ " + doc.data().quantity + " ชิ้น)",
                        actions: [
                            {
                                type: "postback",
                                label: "Add to cart",
                                data: "action=updateorder&itemid=" + doc.id + "&orderId=" + order.id
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
                msg = {
                    type: "template",
                    altText: "Shopping List",
                    template: {
                        type: "carousel",
                        columns: columns
                    }
                }
            }
            else if (includesSome(eventText, ['ตรวจสอบ', 'check cart', 'shopping cart', 'cart', 'cart list', 'list'])) {
                let order = orderSnapshot.then(querySnapshot => {
                    querySnapshot.docs.find((doc) => { doc.data().clientId == event.source.userId && doc.data().status == "shopping" })
                })
                let orderText = "รายการสั่งซื้อ #" + order.id + "\n"
                let totalPrice = 0
                order.data().items.forEach((item) => {
                    let product = noteSnapshot.find((doc) => {doc.id == item.id}).data()
                    totalPrice += parseFloat(product.price) * parseInt(item.qty)
                    orderText += product.title + " จำนวน " + item.qty + "\n"
                })
                orderText += "ราคารวมทั้งหมด $" + totalPrice
                msg = {
                    type: 'text',
                    text: orderText
                };
            }
            else if (includesSome(eventText, ['ชำระเงิน', 'ยืนยันรายการ', 'pay now', 'payment', 'checkout', 'check out'])) {
                let order = orderSnapshot.then(querySnapshot => {
                    querySnapshot.docs.find((doc) => { doc.data().clientId == event.source.userId && doc.data().status == "shopping" })
                })
                let paymentText = "รายการสั่งซื้อ #" + order.id + "\n"
                let totalPrice = 0
                order.data().items.forEach((item) => {
                    let product = noteSnapshot.find((doc) => {doc.id == item.id}).data()
                    totalPrice += parseFloat(product.price) * parseInt(item.qty)
                    orderText += product.title + " จำนวน " + item.qty + "\n"
                })
                paymentText += "ราคารวมทั้งหมด $" + totalPrice + "\n\n"
                paymentText += "สามารถชำระเงินได้ที่ เลขบัญชี xxxxxxxxxxx พร้อมทั้งส่งหลักฐานการโอนเงินเข้ามาได้ผ่านทาง LINE นี้"
                msg = {
                    type: 'text',
                    text: paymentText
                };
                order.update({status: "playing"})
            }
            else if (includesSome(eventText, ['ยกเลิก', 'cancel'])) {
                let order = orderSnapshot.then(querySnapshot => {
                    querySnapshot.docs.find((doc) => { doc.data().clientId == event.source.userId && doc.data().status == "shopping" })
                })
                order.update({status: "cancelled"})
            }
            break;
        default:
            if (includesSome(eventText, ['รายการสินค้า', 'ลิสต์สินค้า', 'ลิสสินค้า', 'list สินค้า', 'product list'])) {
                let columns = []
                const noteSnapshot = await DB.collection('Products').get();
                noteSnapshot.forEach((doc) => {
                    let column = {
                        thumbnailImageUrl: doc.data().picture,
                        title: doc.data().title,
                        text: "$" + doc.data().price + " (คงเหลือ " + doc.data().quantity + " ชิ้น)",
                        actions: [
                            {
                                type: "postback",
                                label: "Add to cart",
                                data: "action=order&itemid=" + doc.id + "&clientId=" + event.source.userId
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
                msg = {
                    type: "template",
                    altText: "Shopping List",
                    template: {
                        type: "carousel",
                        columns: columns
                    }
                }
            }
            break;
    }

    if (includesSome(eventText, ['ประวัติการสั่งซื้อ', 'history'])) {
        let history = orderSnapshot.then(querySnapshot => {
            querySnapshot.docs.filter((doc) => { doc.data().clientId == event.source.userId && doc.data().status == "shipped" })
        })
        let historyText = "ประวัติการสั่งซื้อของท่านทั้งหมด"
        history.forEach((history) => {historyText += history.id + "\n"})
        msg = {
            type: 'text',
            text: historyText
        };
    }
    else if (includesSome(eventText, ['fuck', 'fuxk', 'ควย', 'สัส', 'เหี้ย', 'ชิบหาย', 'มึง', 'กู', 'เย็ด', 'เชี่ย', 'fu*k', 'ค ว ย', 'ห่า', 'หำ', 'หี', 'ระยำ'])) {
        // rude word filter
        msg = {
            type: 'text',
            text: 'หนูดุนะ พี่ไหวหรอ'
        };
    }
    else if (includesSome(eventText, ['debug'])) {
        msg = {
            type: 'text',
            text: orderStatus
        };
    }

    return client.replyMessage(event.replyToken, msg);
}

module.exports = handleEvent
