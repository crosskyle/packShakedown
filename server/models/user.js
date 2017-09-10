const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  kind: {type: String, default: 'User'},
  self: String,
  id: String,
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  packs: [{
    type: Schema.Types.ObjectId,
    ref: 'pack'
  }],
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'item'
  }]
})

// On Save Hook, encrypt password
// Before saving a model, run this function
UserSchema.pre('save', function (next) {
  // Get access to the user model
  const user = this

  // Generate a salt, then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err) }

    // Hash the password using the salt, then run callback
    bcrypt.hash(user.password,salt, null, function (err, hash) {
      if (err) { return next(err) }

      // Overwrite plain text password with encrypted password
      user.password = hash
      next()
    })
  })
})

UserSchema.pre('remove', function(next) {
  const Pack = mongoose.model('pack')
  const Item = mongoose.model('item')

  Pack.remove({ _id: { $in: this.packs } })
    .then(() => Item.remove({ _id: { $in: this.items } }))
    .then(() => next())
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

const User = mongoose.model('user', UserSchema)

module.exports = User
