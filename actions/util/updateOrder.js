const DB = require('../../config/firebase.config')

module.exports = updateOrder = async (clientId, itemId) => {
  let order = await DB.collection('Orders')
                      .where("clientId","==",clientId)
                      .where("status","==","shopping")
                      .get();
  order.forEach(async doc => {
    const index = doc.data()
                     .items
                     .findIndex((item) => itemId == item.id);
    const item = doc.data()
                    .items[index];

    console.log(index, "  ", item);
    console.log(doc.id);

    await DB.collection('Orders')
            .doc(doc.id)
            .update({
              items: [
                ...doc.data().items.slice(0, index),
                { ...item, qty: Number(item.qty) + 1 },
                ...doc.data().items.slice(index + 1)
              ]
            })
  })
}