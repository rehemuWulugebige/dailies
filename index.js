const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi)
const express = require("express")
const mongoose = require("mongoose")
const genres = require("./routes/genres")
const customers = require("./routes/customers")
const movies = require("./routes/movies")
const rentals = require("./routes/rentals")
const app = express()

app.use(express.json())
app.use("/api/genres/", genres)
app.use("/api/customers/", customers)
app.use("/api/movies/", movies)
app.use("/api/rentals/", rentals)

const url = "mongodb://localhost:27017/dailies?replicaSet=rs0"

async function connect(url) {
    try {
        await mongoose.connect(url)
        console.log("Connected to MongoDB for Dailies...")
    } catch (err) {
        console.log("Failed to connect MongoDB...", err)
    }
}

connect(url)

const port = process.env.PORT || 3002

app.listen(port, () => console.log(`listening to ${port}...`))
