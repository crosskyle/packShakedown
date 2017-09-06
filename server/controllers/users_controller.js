/**
 * Created by kylecross on 7/11/17.
 */

const User = require('../models/user')

module.exports = {

  create_user(req, res, next) {
    const userProps = req.body

    User.create(userProps)
      .then(user => res.send(user))
      .catch(next)
  },

  create_pack(req, res, next) {
    const packProps = req.body
    const userId = req.params.userId

    User.findById({ _id: userId })
      .then((user) => {
        user.packs.push(packProps)
        return user.save() // must return to include another callback after promise
      })
      .then(user => res.send(user))
      .catch(next)
  },

  create_item(req, res, next) {
    const itemProps = req.body
    const userId = req.params.userId
    const packId = req.params.packId

    User.findById({ _id: userId })
      .then((user) => {
        const pack = user.packs.id(packId)
        pack.items.push(itemProps)
        return user.save()
      })
      .then(user => res.send(user))
      .catch(next)
  }

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