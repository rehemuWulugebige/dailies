const mongoose = require('mongoose')
const Joi = require('joi')
const {genreSchema} = require('../model/genre')

/*
 * This is the structure of our movie stored in MongoDB
 */
const movieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        trim: true, 
        minlength: 3, 
        maxlength: 255, 
    }, 
    genre: {
        type: genreSchema, 
        required: true, 
    }, 
    numberInStock: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 255, 
    }, 
    dailyRentalRate: {
        type: Number, 
        required: true, 
        min: 0, 
        max: 255, 
    }
})

const Movie = mongoose.model('Movie', movieSchema)

/*
 * Function for which to validate the JSON movie
 */
function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(), 
        genreId: Joi.string().required(), 
        numberInStock: Joi.number().required(), 
        dailyRentalRate: Joi.number().required()
    })

    const result = schema.validate(movie)

    return result

}

module.exports.validate = validateMovie
module.exports.Movie = Movie
