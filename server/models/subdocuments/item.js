const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  category: String,
  title: String,
  description: String,
  weight: Number,
  quantity: Number,
  worn: Boolean,
  consumable: String
})

module.exports = ItemSchema
