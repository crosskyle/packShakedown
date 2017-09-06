/**
 * Created by kylecross on 7/11/17.
 */

const User = require('../models/user')

module.exports = {

  create_user(req, res, next) {
    const userProps = req.body
    console.log("req.body: ", userProps)

    User.create(userProps)
      .then(user => res.send(user))
      .catch(next)
  },

  /*
  edit(req, res, next) {
    const driverId = req.params.id
    const driverProps = req.body

    User.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => User.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next)
  },

  delete(req, res, next) {
    const driverId = req.params.id

    User.findByIdAndRemove({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next)
  }*/
}