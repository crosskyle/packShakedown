const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

module.exports = {

  signin(req, res, next) {
    // User has already had their email and password auth'd
    // Need to give them a token
    User.findOne({ email: req.body.email })
      .then(user => {
        res.send({ token: tokenForUser(req.user), user })
      })
      .catch(next)
  },


  signup(req, res, next) {
    // See if a user with the given email exists
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user)
          return res.status(422).send({ error: 'Email is in use' })
      })
      .then(() => {
        const user = new User({
          email: req.body.email,
          password: req.body.password
        })
        user.id = user._id
        user.self = `/api/users/${user._id}`
        return user.save()
      })
      .then((user) => {
        // Respond to request indicating user was created
        res.send({ token: tokenForUser(user), user })
      })
      .catch(next)
  }
}
