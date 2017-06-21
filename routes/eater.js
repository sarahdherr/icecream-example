'use strict'

const router = require('express').Router()
const {Eater, IceCream} = require('../models')

// gets all eaters (members)
router.get('/', function (req, res, next) {
    Eater.findAll()
      .then(function (eaters) {
        res.send(eaters)
      })
      .catch(function (err) {
        console.error(err)
      })
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

  // creates a new eater
  .post('/', function (req, res, next) {
    console.log('This is the req.body: ', req.body)
    Eater.create(req.body)
         .then(function (eater) {
           res.status(201).json(eater)
         })
         .catch(next)
  })

module.exports = router
