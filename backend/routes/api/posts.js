const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const logger = require('../../utils/logger')

const Post = require('../../models/Post')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      })

      const post = await newPost.save()
      res.status(201).json(post)
    } catch (err) {
      logger.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (err) {
    logger.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    res.json(post)
  } catch (err) {
    logger.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/posts
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    // Check if authenticated user is the post's user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await Post.findOneAndDelete({ _id: req.params.id })
    res.json({ msg: 'Post removed' })
  } catch (err) {
    logger.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' })
    }

    post.likes.push({ user: req.user.id })
    await post.save()
    res.json(post.likes)
  } catch (err) {
    logger.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    const filteredLikes = post.likes.filter(
      like => like.user.toString() !== req.user.id,
    )

    // Check if the post has already been liked
    if (post.likes.length === filteredLikes.length) {
      return res.status(400).json({ msg: 'Post has not yet been liked' })
    }

    post.likes = filteredLikes
    await post.save()
    res.json(post.likes)
  } catch (err) {
    logger.error(err.message)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   POST api/posts/comments/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comments/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      }

      post.comments.unshift(newComment)
      await post.save()
      res.status(201).json(post.comments)
    } catch (err) {
      logger.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route   DELETE api/posts/comments/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id,
    )

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' })
    }

    // Check user is authorized to delete the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorized' })
    }

    post.comments = post.comments.filter(c => c.id !== comment.id)
    await post.save()
    res.json(post.comments)
  } catch (err) {
    logger.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
