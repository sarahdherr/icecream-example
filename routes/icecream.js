'use strict'

const router = require('express').Router()
const {Eater, IceCream} = require('../models') //.IceCream
// console.log('what is icecream', IceCream)
// console.log('what is eater', Eater)
router.get('/', function (req, res, next) {
  IceCream.findAll()
    .then(function (icecreams) {
      res.json(icecreams)
    })
    .catch(next)
})

  .get('/:calorieMax', function (req, res, next) {
    // IceCream.findById(2)
    // .then((ice) => {
    //   console.log('what is icecream', ice)
    //   res.send('What is icecream?', ice)
    // })
    IceCream.lightFlavors(req.params.calorieMax)
      .then(function (icecreams) {
        if (icecreams.length === 0) res.sendStatus(404)
        res.json(icecreams)
      })
      .catch(next)
  })

  .put('/:icecreamId', function (req, res, next) {
    console.log('this is icecream model', IceCream)
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
