import { hot } from 'react-hot-loader/root'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const UnconnectedApp = props => {
  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </div>
  )
}

const mapStateToProps = state => {}

const mapDispatchToProps = {}

const App = connect(
  null,
  null,
)(UnconnectedApp)

export default hot(App)
