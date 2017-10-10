const User = require('../models/user')
const Item = require('../models/item')
const Category = require('../models/category')
const Pack = require('../models/pack')

module.exports = {

  create_pack(req, res, next) {
    const userId = req.params.userId

    const pack = new Pack(req.body)
    pack.id = pack._id
    pack.self = `/api/users/${userId}/packs/${pack._id}`

    User.findById({ _id: userId })
      .then((user) => {
        user.packs.push(pack)
        return Promise.all([user.save(), pack.save()])
          .then(() => res.send(pack))
      })
      .catch(next)
  },


  create_category(req, res, next) {
    const { userId, packId } = req.params

    const category = new Category(req.body)
    category.id = category._id
    category.self = `/api/users/${userId}/packs/${packId}/categories/${category._id}`

    Pack.findById({ _id: packId })
      .then((pack) => {
        pack.categories.push(category)
        return Promise.all([pack.save(), category.save()])
      })
      .then(() => {
        Pack.findById({ _id: packId })
          .populate({
            path: 'categories',
            populate: {
              path: 'items',
              model: 'item'
            }
          })
          .then((pack) => res.send(pack))
          .catch(next)
      })
      .catch(next)
  },


  create_item_in_category(req, res, next) {
    const { userId, packId, categoryId } = req.params

    const item = new Item(req.body)
    item.id = item._id
    item.self = `/api/users/${userId}/items/${item._id}`

    Category.findById({ _id: categoryId })
      .then((category) => {
        category.items.push(item)
        return Promise.all([category.save(), item.save()])
      })
      .then(() => {
        Pack.findById({ _id: packId })
          .populate({
            path: 'categories',
            populate: {
              path: 'items',
              model: 'item'
            }
          })
          .then((pack) => res.send(pack))
          .catch(next)
      })
      .catch(next)

    User.findById({ _id: userId })
      .then((user) => {
        user.items.push(item)
        user.save()
      })
      .catch(next)




  },

  create_item(req, res, next) {
    const userId = req.params.userId

    const item = new Item(req.body)
    item.id = item._id
    item.self = `/api/users/${userId}/items/${item._id}`

    User.findById({ _id: userId })
      .then((user) => {
        user.items.push(item)
        return Promise.all([user.save(), item.save()])
          .then(() => res.send(item))
      })
      .catch(next)
  },
}