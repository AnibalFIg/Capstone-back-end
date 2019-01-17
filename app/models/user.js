'use strict'

const mongoose = require('mongoose')

// mongoose allows the application to validate incoming data
// as seen below, users require unique emails, and nicknames,
// and there are limits to the length of the nickname value
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 12
  },
  profilePicture: {
    type: String,
    required: false,
    unique: false
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

// creates and User class with the userSchema applied to it
module.exports = mongoose.model('User', userSchema)
