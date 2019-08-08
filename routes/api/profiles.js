const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const logger = require('../../utils/logger')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   GET api/profiles/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.user.id })
      .populate('User', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)    

  } catch(err) {
    logger.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router