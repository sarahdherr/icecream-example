'use strict'

const router = require('express').Router()
const {IceCream} = require('../models')

router.get('/', function (req, res, next) {
  IceCream.findAll()
    .then(function (icecreams) {
      res.json(icecreams)
    })
    .catch(next)
})

  .get('/:calorieMax', function (req, res, next) {
    IceCream.lightFlavors(req.params.calorieMax)
      .then(function (icecreams) {
        if (icecreams.length === 0) res.sendStatus(404)
        res.json(icecreams)
      })
      .catch(next)
  })

  .put('/:icecreamId', function (req, res, next) {
    IceCream.update(
      req.body,
      {returning: true, where: req.params.icecreamId}
    )
      .then(function ([rowsUpdated, [updatedFlavor]]) {
        res.json(updatedFlavor)
      })
      .catch(next)
  })

module.exports = router
