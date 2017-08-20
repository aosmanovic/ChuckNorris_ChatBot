var message = require('../helpers/messages'),
  sessions = require('../helpers/sessions'),
  request = require('request'),
  config = require('./../config/main'),
  logger = require('./../lib/logger.js')

module.exports = (req, res) => {
  if (req.body.object === 'page') {
    let entry = req.body.entry[0]
    entry.messaging.forEach(event => {
      if (event.postback && event.postback.payload === 'GET_STARTED_PAYLOAD') {
        sessions.setSession(event.sender.id, 'Start')
          .then(session => {
            message.typingOn(session.senderId)
            message.sendFirstMessage(session.senderId)
          })
          .catch(err => {
            logger.error(`Promise is rejected: ${err}`)
            res.sendStatus(500)
          })
      } else if (event.postback && event.postback.payload === 'HELP') {
        var msg = config.states.HELP
        sessions.setSession(event.sender.id, 'Help')
          .then(session => {
            message.typingOn(session.senderId)
            message.sendMessage(session.senderId, msg)
          })
          .catch(err => {
            logger.error(`Promise is rejected: ${err}`)
            res.sendStatus(500)
          })
      } else if (event.postback && event.postback.payload === 'RESET') {
        sessions.setSession(event.sender.id, 'Reset')
          .then(session => {
            message.typingOn(session.senderId)
            message.sendFirstMessage(session.senderId)
          })
          .catch(err => {
            logger.error(`Promise is rejected: ${err}`)
            res.sendStatus(500)
          })
      } else if (event.postback && event.postback.payload === 'YES') {
        message.typingOn(event.sender.id)
        message.sendJoke(event)
          .then(joke => {
            sessions.setSession(event.sender.id, 'Yes', joke)
              .then(session => {
                logger.info('Joke is sent')
              })
              .catch(err => {
                logger.error(`Promise is rejected: ${err}`)
                res.sendStatus(500)
              })
          })
          .catch(err => {
            logger.error(`Promise is rejected: ${err}`)
            res.sendStatus(500)
          })
      } else if (event.postback && event.postback.payload === 'NO') {
        sessions.setSession(event.sender.id, 'No')
          .then(session => {
            var msg = config.states.NO
            message.typingOn(event.sender.id)
            message.sendMessage(event.sender.id, msg)
          })
          .catch(err => {
            logger.error(`Promise is rejected: ${err}`)
            res.sendStatus(500)
          })
      }
      res.sendStatus(200)
    })
  }
}
