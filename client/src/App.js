import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const UnconnectedApp = props => {
  useEffect(() => {}, [])

  return (
    <Container>
      <h2>React</h2>
    </Container>
  )
}

const mapStateToProps = state => {}

const mapDispatchToProps = {}

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnconnectedApp)

export default hot(App)
