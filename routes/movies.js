const mongoose = require('mongoose')
const express = require('express')
const {Movie, validate} = require('../model/movie')
const {Genre} = require('../model/genre')
const router = express.Router()

router.post('/', async (req, res) => {
    const {error} = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId)

    if (!genre) {
        return res.status(404).send("Genre with the given ID was not found")
    }

    let movie = new Movie({
        title: req.body.title, 
        genre: {
            _id: genre._id, 
            name: genre.name
        }, 
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    movie = await movie.save()

    res.send(movie)
})


module.exports = router
