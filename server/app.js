const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const app = express()
const cors = require('cors')

mongoose.Promise = global.Promise

if(process.env.NOD_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/packShakedown')
}

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }))

routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err._message })
})

module.exports = app
