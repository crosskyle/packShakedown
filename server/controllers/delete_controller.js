const User = require('../models/user')
const Item = require('../models/item')
const Category = require('../models/category')
const Pack = require('../models/pack')

module.exports = {

  delete_item(req, res, next) {
    const { itemId } = req.params

    Item.findByIdAndRemove({_id: itemId})
      .then((item) => res.status(204).send(item))
      .catch(next)
  },

  delete_pack(req, res, next) {
    const { packId, userId } = req.params

    Pack.findByIdAndRemove({_id: packId})
      .then(() => {
        User.findById({ _id: userId })
          .populate({
            path: 'packs',
            populate: {
              path: 'categories',
              model: 'category',
              populate: {
                path: 'items',
                model: 'item'
              }
            }
          })
          .then((user) => res.send(user.packs))
          .catch(next)
      })
      .catch(next)
  },

  delete_category(req, res, next) {
    const { packId, categoryId } = req.params

    Category.findByIdAndRemove({_id: categoryId})
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

  remove_item_from_category(req, res, next) {
    const { packId, categoryId, itemId } = req.params

    Category.findById({_id: categoryId})
      .then((category) => {
        const itemIndex = category.items.indexOf(itemId)
        category.items.splice(itemIndex,1)
        return category.save()
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
  }
}
