const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Genre, validate } = require('../model/genre.js')

/*
 * The post/create of an genre
 */
router.post('/', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let genre = new Genre({
        name: req.body.name
    })

    genre = await genre.save()

    res.send(genre)

})

/*
 * This is the get to obtain the JSON genres
 */
router.get('/', async (req, res) => {
    const genres = await Genre
        .find()
        .sort()

    res.send(genres)
})

/*
 * This returns the genre with specific id
 */
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) {
        return res.status(404).send(`The genre with the given id ${req.params.id} was not found`)
    }

    res.send(genre)
})

/*
 * This is how we update the genre we already have
 */
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name 
        },
        {
            new : true
        }
    )

    if (!genre) {
        return res.status(404).send(`The genre with the given id ${req.params.id} was not found`)
    }

    res.send(genre)

})

/*
 * Implement delete for specific id
 */
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)

    if (!genre) {
        return res.status(404).send(`The genre with the given id ${req.params.id} was not found`)
    }

    res.send(genre)

})

module.exports = router
