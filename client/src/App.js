import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import Alert from './components/layout/Alert'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import PrivateRoute from './components/routing/PrivateRoute'

import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

import './App.css'

if (process.env.mode === 'production') {
  axios.defaults.baseURL = process.env.baseURL
}

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const UnconnectedApp = props => {
  useEffect(() => {
    props.loadUser()
  }, [])

  return (
    <div>
      <NavBar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles/:id" component={Profile} />
          <Route exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute
            exact
            path="/add-experience"
            component={AddExperience}
          />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
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
