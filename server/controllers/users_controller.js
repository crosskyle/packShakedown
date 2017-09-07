const User = require('../models/user')

module.exports = {

  // Create

  create_user(req, res, next) {
    User.create(req.body)
      .then(user => res.send(user))
      .catch(next)
  },


  create_pack(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        user.packs.push(req.body)
        return user.save() // must return to include another callback after promise
      })
      .then(user => res.send(user))
      .catch(next)
  },


  create_item(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        const pack = user.packs.id(req.params.packId)
        pack.items.push(req.body)
        return user.save()
      })
      .then(user => res.send(user))
      .catch(next)
  },


  // Read

  read_user(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then(user => res.send(user))
      .catch(next)
  },


  read_pack(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then(user => res.send(user.packs.id(req.params.packId)))
      .catch(next)
  },


  read_item(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then(user => res.send(user.packs.id(req.params.packId).items.id(req.params.itemId)))
      .catch(next)
  },


  //Update

  update_pack(req, res, next) {
    User.findByIdAndUpdate({ _id: req.params.userId })
      .then((user) => {
        user.packs.id(req.params.packId).set(req.body)
        return user.save()
      })
      .then(user => res.send(user.packs.id(req.params.packId)))
      .catch(next)
  },


  update_item(req, res, next) {
    User.findByIdAndUpdate({ _id: req.params.userId })
      .then((user) => {
        user.packs.id(req.params.packId).items.id(req.params.itemId).set(req.body)
        return user.save()
      })
      .then(user => res.send(user.packs.id(req.params.packId).items.id(req.params.itemId)))
      .catch(next)
  },


  // Delete

  delete_user(req, res, next) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then((user) => res.status(204).send(user))
      .catch(next)
  },


  delete_pack(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        user.packs.id(req.params.packId).remove()
        return user.save()
      })
      .then(user => res.send(user))
      .catch(next)
  },


  delete_item(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        user.packs.id(req.params.packId).items.id(req.params.itemId).remove()
        return user.save()
      })
      .then(user => res.send(user))
      .catch(next)
  },
}
