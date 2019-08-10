import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { useField } from '../../hooks'
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
  const email = useField('email')
  const password = useField('password')

  const onSubmit = e => {
    e.preventDefault()
    login(email.value, password.value)
  }

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input {...email} reset="" placeholder="Email Address" name="email" />
        </div>
        <div className="form-group">
          <input
            {...password}
            reset=""
            placeholder="Password"
            name="password"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don&lsquo;t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
  login,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
