const auth = require('../middleware/auth')
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const { Rental, validate } = require("../model/rental")
const { Movie } = require("../model/movie")
const { Customer } = require("../model/customer")

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const customer = await Customer.findById(req.body.customerId)
    if (!customer) {
        return res.status(404).send("Customer with the given ID was not found")
    }

    const movie = await Movie.findById(req.body.movieId)
    if (!movie) {
        return res.status(404).send("Movie with the given ID was not found")
    }

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
    })

    const session = await mongoose.startSession()
    try {
        await session.withTransaction(async () => {
            await rental.save({ session })
            await Movie.updateOne(
                { _id: movie._id },
                { $inc: { numberInStock: -1 } },
                { session },
            )
        })
        res.send(rental)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Something failed.")
    } finally {
        session.endSession()
    }
})

module.exports = router
