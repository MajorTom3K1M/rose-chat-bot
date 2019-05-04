const debugHandler = (event) => {
  let msg = {
    type: 'text',
    text: "Your order status >>> " + orderStatus
  }
  
  return msg
}