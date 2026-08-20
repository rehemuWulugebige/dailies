const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { Customer, validate } = require('../model/customer.js')

// Create customer
router.post('/', async (req, res) => {
    const { error } = validate(req.body)

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

// Update customer 
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return req.status(400).send(error.details[0].message)
    }
 
    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {
            isGold: req.body.isGold, 
            name: req.body.name, 
            phone: req.body.phone
        }, 
        {
            new: true
        }
    )

    if (!customer) {
        return res.status(404).send('Customer with the given ID is not found')
    }

    res.send(customer)
})

// Customer deletion
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findOneAndDelete(req.params.id)

    if (!customer) { 
        return res.status(404).send("Customer with the given ID was not found")
    }

    res.send(customer)
})

module.exports = router
