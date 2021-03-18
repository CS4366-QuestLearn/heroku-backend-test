var express = require('express')
var cors = require('cors')
var app = express()

// app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', require('./example/router'))

module.exports = app