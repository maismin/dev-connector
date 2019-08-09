import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'

const UnconnectedApp = props => {
  useEffect(() => {}, [])

  return (
    <div>
      <NavBar />
      <Landing />
    </div>
  )
}

const mapStateToProps = state => {}

const mapDispatchToProps = {}

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedApp)

export default hot(App)
