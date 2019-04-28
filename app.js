const port = (process.env.PORT || '3000');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

require('dotenv').config();

let app = express();
let router = require('./router')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/apis/', router);

app.get('/', (req, res) => res.send('Service Backend Start!'))
app.get('/webhook', (req, res) => res.send("Hello"))

app.listen(port, () => console.log(`Http app listening on port ${port}!`))