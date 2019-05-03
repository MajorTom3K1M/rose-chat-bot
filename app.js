const port = (process.env.PORT || '9000');
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const path = require('path');


require('dotenv').config();

let app = express();
let router = require('./router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/apis/', router);

app.get('/', (req, res) => res.send('Rose Shop online!'))

app.use(express.static(path.join(__dirname, 'build')));
app.get('/adminpanel', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Http app listening on port ${port}!`))

