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

// CHALLENGE SOLUTION: updates a given ice cream with information on the req.body
  .put('/:icecreamId', function (req, res, next) {
    IceCream.update(
      req.body,
      {returning: true, where: {id: req.params.icecreamId}}
    )
      .then(function ([rowsUpdated, [updatedFlavor]]) {
        res.json(updatedFlavor)
      })
      .catch(next)
  })

module.exports = router
