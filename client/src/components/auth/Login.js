import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useField } from '../../hooks'

const Login = () => {
  const email = useField('email')
  const password = useField('password')

  const onSubmit = e => {
    e.preventDefault()
    console.log('SUCCESS')
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

export default Login
