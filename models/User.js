const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName:  {
    type: String,
    required: true,
  },
  lastName:  {
    type: String,
    required: true,
  },
  userName:  {
    type: String,
    required: true,
  },
  password:  {
    type: String,
    required: true,
  },
  memberStatus:  {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: false,
  }
})

module.exports = mongoose.model('User',UserSchema);