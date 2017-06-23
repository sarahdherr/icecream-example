'use strict'

const router = require('express').Router()
const IceCream = require('../models').IceCream

// gets all of the icecream flavors
router.get('/', function (req, res, next) {
  IceCream.findAll()
    .then(function (icecreams) {
      res.json(icecreams)
    })
    .catch(next)
})

module.exports = router
