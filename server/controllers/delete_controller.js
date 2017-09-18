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
  }
}