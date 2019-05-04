const shippingHandler = (event) => {
  let msg = {
    type: 'text',
    text: "ได้รับสถานที่จัดส่งเรียบร้อยแล้วค่ะ ขอบคุณที่ใช้บริการคุณหนู Rose นะคะ สวัสดีค่ะ"
  }

  let order = orderSnapshot.get()
                .then(querySnapshot => {
                  querySnapshot.docs.find(
                    (doc) => { 
                      doc.data().clientId == event.source.userId && doc.data().status == "shipping"
                    })
                })

  order.then(result => result.update({status: "shipped"}))
  return msg
}

module.exports = shippingHandler