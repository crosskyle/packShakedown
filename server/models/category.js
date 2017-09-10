const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  title: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'item' }]
})

const Category = mongoose.model('category', CategorySchema)

module.exports = Category