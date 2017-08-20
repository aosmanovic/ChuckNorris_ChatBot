var model = require('./../models/session'),
  logger = require('./../lib/logger.js'),
  Promise = require('promise'),
  config = require('./../config/main')

function setSession (senderId, state, joke) {
  return new Promise((resolve, reject) => {

    var botMessage = getResponse(state, joke)
    newSession = new model.Session({
      senderId: senderId,
      senderMessage: state,
      botMessage: botMessage
    })

    newSession.save((err) => {
      if (err) {
        logger.error(`Session 500 ${err}`)
        return reject(err)
      }
      return resolve(newSession)
    })
  })
}

function getResponse (message, joke) {
  var response = ''
  if (message == 'Start') {
    response = config.states.GET_STARTED
  } else if (message == 'Reset') {
    response = config.states.GET_STARTED
  } else if (message == 'Help') {
    response = config.states.HELP
  } else if (message == 'No') {
    response = config.states.NO
  } else if (message == 'Yes') {
    response = joke
  }
  return response
}

module.exports = {
  setSession: setSession
}
