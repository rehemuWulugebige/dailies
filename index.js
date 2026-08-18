const express = require('express')
const genres = require('./routes/genres')
const Joi = require('joi')

const app = express()

app.use(express.json())
app.use('/api/genres/', genres)



const port = process.env.PORT || 3002

app.listen(port, () => console.log(`listening to ${port}...`))


