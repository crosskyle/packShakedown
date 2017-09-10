const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  kind: {type: String, default: 'Item'},
  self: String,
  id: String,
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  weight: {type: Number, default: 0},
  quantity: {type: Number, default: 0},
  worn: {type: Boolean, default: false},
  consumable: {type: Boolean, default: false},
})

const Item = mongoose.model('item', ItemSchema)

module.exports = Item
