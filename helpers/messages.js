const request = require('request-promise')
config = require('./../config/main'),
template = require('./../utils/messageTemplates'),
logger = require('./../lib/logger.js')

function sendJoke (event) {
  return new Promise((resolve, reject) => {
    const senderId = event.sender.id
    var options = {
      method: 'GET',
      uri: config.jokeURL
    }
    request(options)
      .then((response) => {
        return JSON.parse(response).value.joke
      })
      .then((joke) => {
        sendMessage(senderId, joke)
        return resolve(joke)
      })
      .catch((err) => {
        logger.error(`Error sending message: ${err}`)
        return reject(err)
      })
  })
}

function getStarted (res) {
  var options = {
    url: config.getStartedURL,
    qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: template.GET_STARTED
  }
  request(options)
    .then((response) => {
      logger.info(`Get started component added: ${JSON.stringify(response)}`)
      options = {
        url: config.getStartedURL,
        qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: template.PERSISTENT_MENU
      }
      request(options)
        .then((response) => {
          logger.info(`Persistent menu added: ${JSON.stringify(response)}`)
          res.sendStatus(200)
        })
        .catch((err) => {
          if (err) {
            logger.error(`Error sending message: ${err}`)
            res.sendStatus(500)
          } else if (response.body.error) {
            logger.error(`Error: ${response.body.error}`)
            res.sendStatus(500)
          }
        })
    })
    .catch((err) => {
      if (err) {
        logger.error(`Error sending message: ${err}`)
        res.sendStatus(500)
      } else if (response.body.error) {
        logger.error(`Error: ${response.body.error}`)
        res.sendStatus(500)
      }
    })
}

function sendMessage (senderId, message) {
  options = {
    url: config.messagesURL,
    qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: {
        'attachment': {
          'type': 'template',
          'payload': {
            'template_type': 'button',
            'text': message,
            'buttons': [
              {
                'title': 'New joke',
                'type': 'postback',
                'payload': 'YES'
              }
            ]
          }
        }
      }
    }
  }
  sendRequest(options)
}

function sendFirstMessage (senderId) {
  options = {
    url: config.messagesURL,
    qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: template.YES_NO
    }
  }
  sendRequest(options)
}

function typingOn (senderId) {
  options = {
    url: config.messagesURL,
    qs: { access_token: config.FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    json: {
      recipient: { id: senderId },
      sender_action: 'typing_on'
    }
  }
  sendRequest(options)
}

function sendRequest (options) {
  request(options)
    .then((response) => {
      logger.info('Message sent')
    })
    .catch((err) => {
      if (err) {
        logger.error(`Error sending message: ${err}`)
      } else if (response.body.error) {
        logger.error(`Error: ${response.body.error}`)
      }
    })
}

module.exports = {
  sendJoke: sendJoke,
  getStarted: getStarted,
  typingOn: typingOn,
  sendMessage: sendMessage,
  sendFirstMessage: sendFirstMessage
}
