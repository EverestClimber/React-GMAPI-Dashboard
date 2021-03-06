/**
 * Root Component
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Core from './modules/App'

// Base stylesheet
import 'font-awesome/css/font-awesome.css'
import './styles/styles.css'
import 'react-notifications/lib/notifications.css'
const theme = createMuiTheme();
export default function App(props) {
  return (
    <Provider store={props.store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={props.history}>
          <Route path="/" component={Core} />
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired,
}
