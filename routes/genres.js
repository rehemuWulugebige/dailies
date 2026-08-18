const express = require('express')
const router = express.Router()



const genres = []

/*
 * The post/create of an genre
 */
router.post('/', (req, res) => {

    const { error } = validateGenre(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = {
        id: genres.length + 1, 
        name: req.body.name,
        description: req.body.description,
        examples: req.body.examples
    }

    genres.push(genre)

    res.send(genre)

})

/*
 * This is the get to obtain the JSON genres
 */
router.get('/', (req, res) => {
    res.send(genres)
})
/*
 * This returns the genre with specific id
 */
router.get('/:id', (req, res) => {
    const genre = genres.find((g) => {
        return g.id === Number(req.params.id)
    })

    if (!genre) {
        return res.status(404).send(`The genre with the given id ${req.params.id} was not found`)
    }

    res.send(genre)
})

/*
 * This is how we update the genre we already have
 */
router.put('/:id', (req, res) => {
    const genre = genres.find((g) => {
        return g.id === Number(req.params.id)
    })

    if (!genre) {
        return res.status(404).send(`The genre with the given id ${req.params.id} was not found`)
    }

    const { error } = validateGenre(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    genre.name = req.body.name
    genre.description = req.body.description
    genre.examples = req.body.examples

    res.send(genre)

})

/*
 * Implement delete for specific id
 */
router.delete('/:id', (req, res) => {
    const genreIndex = genres.findIndex((g) => {
        return g.id === Number(req.params.id)
    })

    if (genreIndex === -1) {
        return res.status(404).send(`The genre with the given id ${req.params.id} was not found`)
    }

    const [genre] = genres.splice(genreIndex, 1)

    res.send(genre)

})

/*
 * Function for which to validate the JSON genre
 */
function validateGenre(genre) {

    const method = (value, helpers) => {
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length
        if (wordCount < 3) {
            return helpers.message('At least three word is needed for description')
        }
        return value
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().custom(method, 'custom validation for at least three word count').required(),
        examples: Joi.array().items(Joi.string()).min(2).required()
    })

    const result = schema.validate(genre)

    return result

}

module.exports = router
