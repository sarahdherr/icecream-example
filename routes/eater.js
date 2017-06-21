'use strict'

const router = require('express').Router()
const {Eater} = require('../models')

router.get('/', function (req, res, next) {
  Eater.findAll()
    .then(function (eaters) {
      res.send(eaters)
    })
    .catch(function (err) {
      console.error(err)
    })
})
  .get('/:flavorId', function (req, res, next) {
    Eater.findAll({
      where: {
        favoiteId: req.params.flavorId
      }
    })
      .then(function (eaters) {
        res.status(200).json(eaters)
      })
      .catch(next)
  })

  .put('/:id', function (req, res, next) {
    const favorite = req.body.flavor
    Eater.findById(req.params.id)
         .setFavorite(favorite)
         .then(function (eater) {
           res.json(eater)
         })
         .catch(next)
  })

  .post('/', function (req, res, next) {
    Eater.create(req.body)
         .then(function (eater) {
           res.status(201).json(eater)
         })
         .catch(next)
  })

module.exports = router
