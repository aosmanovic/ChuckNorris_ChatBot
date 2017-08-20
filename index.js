const express = require('express'),
  bodyParser = require('body-parser'),
  request = require('request'),
  verificationController = require('./controllers/verification'),
  messageWebhookController = require('./controllers/webhook'),
  config = require('./config/main'),
  db = require('./config/db'),
  message = require('./helpers/messages')

var app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hi I am a chatbot')
})

app.get('/setup', (req, res) => {
  message.getStarted(res)
})

app.get('/webhook/', verificationController)

app.post('/webhook/', messageWebhookController)

app.listen(app.get('port'), () => console.log('Webhook server is listening, port 5000'))
