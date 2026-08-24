const mongoose = require('mongoose')
const express = require('express')
const {Movie, validate} = require('../model/movie')
const {Genre} = require('../model/genre')
const router = express.Router()

/**
    * Creating the movie
*/
router.post('/', async (req, res) => {
    const {error} = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId)

    if (!genre) {
        return res.status(400).send("Genre with the given ID was not found")
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

/**
    * Getting all the movie
*/
router.get('/', async (req, res) => {
    const movies = await Movie.find()
    res.send(movies)
})

/**
    * Get the movie with the specific ID
*/
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)

    if (!movie) {
        return res.status(404).send("Movie with the given ID was not found")
    }

    res.send(movie)
})

/**
    * Update movie
*/
router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findById(req.body.genreId)

    if (!genre) {
        return res.status(400).send("Genre with the given ID was not found")
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title, 
            genre: {
                _id: genre._id, 
                name: genre.name
            }, 
            numberInStock: req.body.numberInStock, 
            dailyRentalRate: req.body.dailyRentalRate
        }, 
        {
            new: true
        }
    )

    if (!movie) {
        return res.status(404).send("Movie with the given ID was not found")
    }

    res.send(movie)

})

/**
    * Delete movie
*/
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie) {
        return res.status(404).send("Movie with the given ID was not found")
    }

    res.send(movie)
})

module.exports = router
