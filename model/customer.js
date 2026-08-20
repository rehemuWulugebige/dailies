const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    isGold: Boolean, 
    name: String, 
    phone: String, 
})

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string(), 
        phone: Joi.string()
    })

    const result = schema.validate(customer)
    return result
}

module.exports.Customer = Customer
module.exports.validate = validateCustomer
