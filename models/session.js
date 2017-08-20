var mongoose = require('mongoose')

var Session = new mongoose.Schema({
  senderId: {
    type: String
  },
  senderMessage: {
    type: String,
    enum: ['Start', 'Reset', 'Help', 'No', 'Yes']
  },
  botMessage: {
    type: String
  }
})

var Session = module.exports = mongoose.model('Session', Session)

module.exports = {
  Session: Session
}
