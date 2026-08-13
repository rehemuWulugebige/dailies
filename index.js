const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

const genres = []

/*
 * The post/creat of an genre
 */

function validateGenre(genre) {

    const method = (value, helpers) => {
        const wordCount = value.trim().split('/\s+/').filter(Boolean).length
        if (wordCount < 3) {
            return helpers.error('At least three word is needed')
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

const port = process.env.PORT | 3002

app.listen(port, () => console.log(`listening to ${port}...`))


