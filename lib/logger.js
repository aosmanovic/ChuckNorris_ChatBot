var winston = require('winston'),
  path = require('path'),
  transports = []

winston.transports.DailyRotateFile = require('winston-daily-rotate-file')
winston.emitErrs = true

transports.push(new winston.transports.DailyRotateFile({
  name: 'file',
  datePattern: '.yyyy-MM-dd',
  filename: path.join(__dirname, '../logs', 'chatbot-services.log')
}))

var logger = new winston.Logger({ transports: transports })

module.exports = logger
module.exports.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}
