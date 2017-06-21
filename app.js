'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')
const eaterRoutes = require('./routes/eater')
const icecreamRoutes = require('./routes/icecream')
const db = require('./models').db

const app = express()

module.exports = app

app.use(express.static(path.join(__dirname, './public'))) // not needed for this example but good to add
app.use(bodyParser.urlencoded({ extended: false })) // not needed for this example but good to add
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/eater', eaterRoutes)
app.use('/icecream', icecreamRoutes)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message)
})

db.sync()
  .then(function () {
    console.log('Synced db')
    app.listen(3000, function () {
      console.log('Server listening at port 3000')
    })
  })
  .catch(function () {
    console.log('There was an error syncing the database')
  })
