const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

const db = config.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    logger.info('connected to MongoDB')
  } catch (err) {
    logger.error('error connection to MongoDB:', err.message)
    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB
