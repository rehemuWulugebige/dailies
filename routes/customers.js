const express = require('express')
const router = express.Router()
const Joi = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    isGold: Boolean, 
    name: String, 
    phone: String, 
})

const Customer = mongoose.model('Customer', cutomerSchema)

// router.get('/', async (req, res) => {
//     const customers = Customer.find()
//     res.send(customers)
// })

function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string(), 
        phone: Joi.string()
    })

    const result = schema.validate(customer)
    return result
}

module.exports = router
