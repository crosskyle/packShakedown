const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  description: String,
  weight: Number,
  quantity: Number,
  worn: Boolean,
  consumable: Boolean,
})

const Item = mongoose.model('item', ItemSchema)

module.exports = Item
