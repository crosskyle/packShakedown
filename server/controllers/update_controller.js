const User = require('../models/user')
const Item = require('../models/item')
const Category = require('../models/category')
const Pack = require('../models/pack')

module.exports = {

  update_pack(req, res, next) {
    const packId = req.params.packId

    Pack.findById({ _id: packId })
      .then((pack) => {

        pack.title = req.body.title
        pack.description = req.body.description
        console.log(pack)
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
  }
}