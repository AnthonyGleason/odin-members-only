const mongoose = require('mongoose');
const User = require('./User');

const MessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp:  {
    type: Date,
    required: true,
  },
  text:  {
    type: String,
    required: true,
  },
  createdBy:  {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Message',MessageSchema);