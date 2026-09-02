const config = require("config")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const express = require("express")
const router = express.Router()
const { User } = require("../model/user")

router.post("/", async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).send("Invalid email or password")
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        return res.status(400).send("Invalid email or password")
    }

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"))

    res.send(token)
})

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return res.status(404).send("User with the given ID was not found")
    }

    res.send(_.pick(user, ["_id", "name", "email"]))
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    const result = schema.validate(req)

    return result
}

module.exports = router
