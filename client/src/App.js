import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const UnconnectedApp = props => {
  useEffect(() => {
    props.loadUser()
  })

  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </div>
  )
}

const mapDispatchToProps = {
  loadUser,
}

const App = connect(
  null,
  mapDispatchToProps,
)(UnconnectedApp)

export default hot(App)
