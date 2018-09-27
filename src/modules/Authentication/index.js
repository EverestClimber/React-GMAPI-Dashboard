import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

const AsyncLogin = asyncComponent(() => import('./Login'))

const Authentication = (props) => {
  if (props.auth.state === 'LOGGED') {
    return <Redirect to='/main' />
  }

  return (
    <Switch path='/auth'>
      <Route path='/auth/login' component={ AsyncLogin } />

      <Redirect exact path='/auth' to='/auth/login' />
      <Redirect path='*' to='/auth' />
    </Switch>
  )
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

export default connect(mapStateToProps)(Authentication)
