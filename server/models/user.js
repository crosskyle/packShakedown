
const mongoose = require('mongoose')
const PackSchema = require('./subdocuments/pack')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  packs: [PackSchema]
})

const User = mongoose.model('user', UserSchema)

module.exports = User
