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

// CHALLENGE SOLUTION: gets all flavors below a given calorie amount
  .get('/:calorieMax', function (req, res, next) {
    IceCream.lightFlavors(req.params.calorieMax)
      .then(function (icecreams) {
        if (icecreams.length === 0) res.sendStatus(404)
        res.json(icecreams)
      })
      .catch(next)
  })

module.exports = router
