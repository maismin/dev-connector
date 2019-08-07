const express = require('express')
const config = require('./utils/config')
const connectDB = require('./utils/db')

const app = express()

// Connect Database
connectDB()

app.get('/', (req, res) => res.send('API Running'))

app.listen(config.PORT, () => console.log(`Server started on port ${config.PORT}`))