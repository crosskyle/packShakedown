const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  kind: {type: String, default: 'Category'},
  self: String,
  id: String,
  title: {type: String, default: ''},
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'item' }]
})

const Category = mongoose.model('category', CategorySchema)

module.exports = Category