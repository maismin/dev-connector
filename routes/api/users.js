const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')

const logger = require('../../utils/logger')
const User = require('../../models/User')

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Users route'))

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // Check if user exists
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        size: '200',
        rating: 'pg',
        default: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

      // Encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      // Return jsonwebtoken

      res.status(201).send('User registered')
    } catch(err) {
      logger.error(err.message)
      res.send(500).send('Server error')
    }
  }
)

module.exports = router