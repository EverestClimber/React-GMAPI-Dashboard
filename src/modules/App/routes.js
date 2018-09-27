import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Import Components
import asyncComponent from '../../components/AsyncComponent'

import Authentication from '../Authentication'
import Main from '../Main'
// const AsyncMain = asyncComponent(() => import('../Main'))

const routes = (props) => {
  return (  
    <Switch path='/'>
      <Route path='/main' component={ Main } />
      <Route path='/auth' component={ Authentication } />
      <Redirect exact path='/' to='/auth' />
      <Redirect path='*' to='/' />
    </Switch>
  )
  
}

export default routes
