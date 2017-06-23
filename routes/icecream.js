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

  // gets all flavors below a given calorie amount
  .get('/:calorieMax', function (req, res, next) {

    IceCream.lightFlavors(req.params.calorieMax)
      .then(function (icecreams) {
        if (icecreams.length === 0) res.sendStatus(404)
        res.json(icecreams)
      })
      .catch(next)
  })

  // did not go over in review -- updates a given ice cream with information on the req.body
  .put('/:icecreamId', function (req, res, next) {
    IceCream.update(
      req.body,
      {returning: true, where: {id: req.params.icecreamId} }
    )
      .then(function ([rowsUpdated, [updatedFlavor]]) {
        res.json(updatedFlavor)
      })
      .catch(next)
  })

module.exports = router
