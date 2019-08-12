import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'

const Post = ({ match, getPost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost])
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
})

const mapDispatchToProps = {
  getPost,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post)
