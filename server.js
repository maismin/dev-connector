const path = require('path')
const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const connectDB = require('./utils/db')
const logger = require('./utils/logger')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(cors())
app.use(express.json({ extended: false }))

// Define Routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/users', require('./routes/api/users'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set up static folder
  app.use(express.static('dist'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })
}

app.listen(config.PORT, () =>
  logger.info(`Server started on port ${config.PORT}`),
)
