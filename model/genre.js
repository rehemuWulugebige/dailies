const Joi = require('joi')
const mongoose = require('mongoose')

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
    }, 
}))

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

module.exports.Genre = Genre
module.exports.validate = validateGenre
