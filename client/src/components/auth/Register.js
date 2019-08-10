import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { useField } from '../../hooks'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'

const Register = ({ setAlert, register, isAuthenticated }) => {
  const name = useField('text')
  const email = useField('email')
  const password = useField('password')
  const password2 = useField('password')

  const onSubmit = e => {
    e.preventDefault()
    if (password.value !== password2.value) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({
        name: name.value,
        email: email.value,
        password: password.value,
      })
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input {...name} reset="" placeholder="Name" name="name" required />
        </div>
        <div className="form-group">
          <input {...email} reset="" placeholder="Email Address" name="email" />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className="form-group">
          <input
            {...password2}
            reset=""
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatchToProps = {
  setAlert,
  register,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register)
