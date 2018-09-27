import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import styles
import './styles/styles.css'

// Import components
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderBar from './components/HeaderBar'
import SideBar from './components/SideBar'
// Import routes
import routes from './routes'

// Import Actions
import { loginSucceeded, loginRequested } from '../../redux/actions/auth'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true,
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.props.loginRequested()
  }

  handleSideBarClose = () => {
    this.setState({ open: false });
  }

  handleSideBarOpen = () => {
    this.setState({ open: true });
  } 

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          {this.props.auth.state == "LOGGED" &&
            <HeaderBar isOpened={this.state.open} handleSideBarOpen={this.handleSideBarOpen}/>
          }
          {this.props.auth.state == "LOGGED" &&
            <SideBar isOpened={this.state.open} handleSideBarClose={this.handleSideBarClose}/>
          }
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            { routes(this.props) }
          </main>
        </div>
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
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

// Retrieve dispatch and callbacks from store as props
const mapDispatchToProps = dispatch => {
  return {
    loginSucceeded: (token) => dispatch(loginSucceeded(token)),
    loginRequested: (token) => dispatch(loginRequested(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
