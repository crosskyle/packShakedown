const User = require('../models/user')

module.exports = {

  // Create

  create_pack(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        user.packs.push(req.body)
        return user.save() // must return to include another callback after promise
      })
      .then(user => res.send(user))
      .catch(next)
  },


  create_gear_item(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        user.gear.push(req.body)
        return user.save() // must return to include another callback after promise
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
      .then(user => {
        const packItemIds = user.packs.id(req.params.packId).itemIds
        const allItems = user.gear

        let packItems = []
        let map = new Map()

        allItems.forEach(x => map.set(x.id.toString(), x))

        packItemIds.forEach(x => {
          if (map.has(x))
            packItems.push((map.get(x)))
        })

        res.send({
          "title": user.packs.id(req.params.packId).title,
          "_id": user.packs.id(req.params.packId)._id,
          "items": packItems
        })
      })
      .catch(next)
  },


  read_gear(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then(user => res.send(user.gear))
      .catch(next)
  },


  //Update

  update_pack_item(req, res, next) {
    User.findByIdAndUpdate({ _id: req.params.userId })
      .then((user) => {
        const itemId = req.body.itemId
        user.packs.id(req.params.packId).itemIds.push(itemId)
        return user.save()
      })
      .then(user => res.send(user.packs.id(req.params.packId)))
      .catch(next)
  },

  update_pack(req, res, next) {
    User.findByIdAndUpdate({ _id: req.params.userId })
      .then((user) => {
        user.packs.id(req.params.packId).set(req.body)
        return user.save()
      })
      .then(user => res.send(user.packs.id(req.params.packId)))
      .catch(next)
  },


  update_gear_item(req, res, next) {
    User.findByIdAndUpdate({ _id: req.params.userId })
      .then((user) => {
        user.gear.id(req.params.itemId).set(req.body)
        return user.save()
      })
      .then(user => res.send(user.gear.id(req.params.itemId)))
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


  delete_gear_item(req, res, next) {
    User.findById({ _id: req.params.userId })
      .then((user) => {
        user.gear.id(req.params.itemId).remove()
        return user.save()
      })
      .then(user => res.send(user))
      .catch(next)
  },
}
