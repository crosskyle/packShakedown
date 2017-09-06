const mongoose = require('mongoose')
const ItemSchema = require('./item')
const Schema = mongoose.Schema

const PackSchema = new Schema({
  title: String,
  description: String,
  items: [ItemSchema]
})

module.exports = PackSchema