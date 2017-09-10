const User = require('../models/user')
const Item = require('../models/item')
const Category = require('../models/category')
const Pack = require('../models/pack')

module.exports = {

  read_user(req, res, next) {
    const userId = req.params.userId

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
      .populate('items')
      .then((user) => {
        res.send(user)
      })
      .catch(next)
  }
}