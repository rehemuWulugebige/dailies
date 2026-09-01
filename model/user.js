const mongoose = require("mongoose")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model("User", userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    const result = schema.validate(user)

    return result
}

module.exports.validate = validateUser
module.exports.User = User
