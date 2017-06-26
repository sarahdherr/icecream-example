'use strict'

const router = require('express').Router()
const Eater = require('../models').Eater

module.exports = router

// creates a new eater
router.post('/', function (req, res, next) {
  Eater.create(req.body)
    .then(function (eater) {
      res.status(201).json(eater)
    })
    .catch(next)
})

  // gets all eaters (members)
  .get('/', function (req, res, next) {
    Eater.findAll()
      .then(function (eaters) {
        res.send(eaters)
      })
      .catch(function (err) {
        console.error(err)
      })
  })

  // updates a eater to set a favorite icecream
  .put('/:id', function (req, res, next) {
    const favorite = req.body.flavor
    Eater.findById(req.params.id)
      .then(function (eater) {
        eater.setFavorite(favorite)
        res.json(eater)
      })
      .catch(next)
  })

  // CHALLENGE SOLUTION: route to hit to update total scoop for an eater
  .put('/visit/:id', function (req, res, next) {
    Eater.findById(req.params.id)
      .then(function (eater) {
        eater.addScoop()
        res.json(eater)
      })
      .catch(next)
  })

  // gets all eaters with the favorite icecream :flavorId (which is an id for an icecream)
  .get('/:flavorId', function (req, res, next) {
    Eater.findAll({
      where: {
        favoriteId: req.params.flavorId
      }
    })
      .then(function (eaters) {
        res.status(200).json(eaters)
      })
      .catch(next)
  })
