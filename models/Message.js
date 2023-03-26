const mongoose = require('mongoose');
const User = require('./User');

const MessageSchema = new mongoose.Schema({
  title: String,
  timestamp: Date,
  text: String,
  createdBy: String,
});

module.exports = mongoose.model('Message',MessageSchema);