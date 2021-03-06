const admin = require('firebase-admin');

const serviceAccount = require('./rose-bot-shop-firebase.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rose-bot-shop.firebaseio.com'
})

module.exports = DB = admin.firestore();
