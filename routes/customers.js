const express = require('express')
const router = express.Router()
const Joi = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    isGold: Boolean, 
    name: String, 
    phone: String, 
})

const Customer = mongoose.model('Customer', customerSchema)

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)

    if (error) {
        res.status(400).send(error.details[0].message)
    }

    let customer = new Customer({
        isGold: req.body.isGold, 
        name: req.body.name, 
        phone: req.body.phone
    })

    customer = await customer.save()

    res.send(customer)
})

// Get all the customer in the database
router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.send(customers)
})

// Get the cutomer with the given ID
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)

    if (!customer) {
        return res.status(404).send('Customer with the given ID was NOT found')
    }

    res.send(customer)
})

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
