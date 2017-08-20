var config = require('./../config/main'),
  logger = require('./../lib/logger.js')

module.exports = (req, res) => {
  const hubChallenge = req.query['hub.challenge']

  const hubMode = req.query['hub.mode']
  const verifyTokenMatches = (req.query['hub.verify_token'] === config.FACEBOOK_ACCESS_TOKEN)

  if (hubMode && verifyTokenMatches) {
    logger.info('Verification succeeded')
    res.status(200).send(hubChallenge)
  } else {
    logger.error('Verification failed')
    res.status(403).end()
  }
}
