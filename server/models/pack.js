const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PackSchema = new Schema({
  title: String,
  description: String,
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }]
})

PackSchema.pre('remove', function(next) {
  const Category = mongoose.model('category')

  Category.remove({ _id: { $in: this.categories } })
    .then(() => next())
})

const Pack = mongoose.model('pack', PackSchema)

module.exports = Pack