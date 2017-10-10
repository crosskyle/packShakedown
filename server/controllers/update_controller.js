const User = require('../models/user')
const Item = require('../models/item')
const Category = require('../models/category')
const Pack = require('../models/pack')

module.exports = {

  update_item(req, res, next) {
    const { packId, itemId } = req.params

    Item.findById({ _id: itemId })
      .then((item) => {
        item.title = req.body.title
        item.description = req.body.description
        item.quantity = req.body.quantity
        item.weight = req.body.weight
        item.worn = req.body.worn
        item.consumable = req.body.consumable
        return item.save()
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

  update_pack(req, res, next) {
    const packId = req.params.packId

    Pack.findById({ _id: packId })
      .then((pack) => {
        pack.title = req.body.title
        pack.description = req.body.description
        return pack.save()
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

  put_item_in_category(req, res, next) {
    const { packId, categoryId, itemId } = req.params
    let thisCategory

    Category.findById({ _id: categoryId })
      .then((category) => thisCategory = category)
      .then(() => Item.findById({ _id: itemId })
        .then((item) => {
          thisCategory.items.push(item)
          return thisCategory.save()
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
        .catch(next))
      .catch(next)
  }
}