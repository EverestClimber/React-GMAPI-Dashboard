import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncDashboard = asyncComponent(() => import('./Dashboard'))
const AsyncDashboard1 = asyncComponent(() => import('./Dashboard1'))

const Main = (props) => {
  if (props.auth.state != 'LOGGED') {
    return <Redirect to='/auth' />
  }

  return (
    <Switch path='/main'>
      <Route exact path='/main/dashboard' component={ AsyncDashboard } />
      <Route exact path='/main/dashboard1' component={ AsyncDashboard1 } />
      <Redirect exact path='/main' to='/main/dashboard' />
      <Redirect path='*' to='/main' />
    </Switch>
  )
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Main)
