/**
 * Created by kylecross on 7/10/17.
 */

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const app = express()

mongoose.Promise = global.Promise

if(process.env.NOD_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/packShakedown')
}

app.use(bodyParser.json())

routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message })
})

module.exports = app
