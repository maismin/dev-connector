const express = require('express')
const config = require('./utils/config')
const connectDB = require('./utils/db')
const logger = require('./utils/logger')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/users', require('./routes/api/users'))

app.listen(config.PORT, () =>
  logger.info(`Server started on port ${config.PORT}`),
)
