const User = require('../models/user')
const Item = require('../models/item')
const Category = require('../models/category')
const Pack = require('../models/pack')

module.exports = {

  delete_item(req, res, next) {
    const itemId = req.params.itemId

    Item.findByIdAndRemove({_id: itemId})
      .then((item) => res.status(204).send(item))
      .catch(next)
  },

  delete_category(req, res, next) {
    const categoryId = req.params.categoryId
    const packId = req.params.packId

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
    const itemId = req.params.itemId
    const categoryId = req.params.categoryId
    const packId = req.params.packId

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
