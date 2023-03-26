const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  memberStatus: String,
})

module.exports = mongoose.model('User',UserSchema);