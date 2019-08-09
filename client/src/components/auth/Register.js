import React, { Fragment } from 'react'
import { useField } from '../../hooks'

const Register = () => {
  const name = useField('text')
  const email = useField('email')
  const password = useField('password')
  const password2 = useField('password')

  const onSubmit = e => {
    e.preventDefault()
    if (password.value !== password2.value) {
      console.log('Passwords do not match')
    } else {
      console.log(name.value, email.value, password.value, password2.value)
    }
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
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  )
}

export default Register
