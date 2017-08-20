// Bring Mongoose into the app
var mongoose = require('mongoose'),
  config = require('./../config/main'),
  logger = require('./../lib/logger.js')

// Create the database connection
mongoose.Promise = global.Promise
mongoose.connect(config.database)

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${config.database}`)
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  logger.error(`Mongoose default connection error: ${err}`)
})

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
