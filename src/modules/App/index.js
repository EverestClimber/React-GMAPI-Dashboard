import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import styles
import './styles/styles.css'

// Import components
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack';
// import CircularProgress from '@material-ui/core/CircularProgress';
import HeaderBar from './components/HeaderBar'
import SideBar from './components/SideBar'
// Import routes
import routes from './routes'

// Import Actions
import { loginRequested } from '../../redux/actions/auth'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      headerOpened: true,
      checked: false,
    }
  }

  componentDidMount() {
    if (this.props.auth.state == "LOGGED")
      this.setState({checked: true})
    else
      this.props.loginRequested()
  }

  componentWillReceiveProps({ auth }) {
    if (auth.state != "LOGGING_IN") {
      this.setState({checked: true})
    }
  }

  handleSideBarClose = () => {
    this.setState({ headerOpened: false })
  }

  handleSideBarOpen = () => {
    this.setState({ headerOpened: true })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <SnackbarProvider
          maxSnack={3}
          transitionDuration={{ exit: 10, enter: 40 }}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        >
          <CssBaseline />
          <div className={classes.root}>
            {this.props.auth.state == "LOGGED" &&
              <HeaderBar isOpened={this.state.headerOpened} handleSideBarOpen={this.handleSideBarOpen}/>
            }
            {this.props.auth.state == "LOGGED" &&
              <SideBar isOpened={this.state.headerOpened} handleSideBarClose={this.handleSideBarClose}/>
            }
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              { this.state.checked && routes(this.props) }
              {/* { !this.state.checked || this.props.global.loading && <CircularProgress className={classes.loading} size={100} /> } */}
            </main>
          </div>
        </SnackbarProvider>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  // loading: {
  //   position: 'absolute',
  //   margin: 'auto',
  //   top: 0, left: 240, bottom: 0, right: 0,
  // }
})

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth,
  }
}

// Retrieve dispatch and callbacks from store as props
const mapDispatchToProps = dispatch => {
  return {
    loginRequested: (token) => dispatch(loginRequested(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
