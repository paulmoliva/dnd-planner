const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const auth = require('./api/routes/auth')

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.use('/api/auth/', auth);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);