import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'
import classNames from 'classnames'
import { GoogleLogout } from 'react-google-login'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import { logoutSucceeded } from '../../../../redux/actions/auth'

const drawerWidth = 240

class HeaderBar extends Component {

  constructor(props) {
    super(props)
  }

  onLogoutButton = ({ onClick }) => (
    <IconButton color="inherit" style={{outline: 'none'}} onClick={onClick}>
      <i className="fa fa-sign-out" aria-hidden="true"></i>
    </IconButton>
  )

  onSuccess = (e) => {
    this.props.logoutSucceeded()
  }

  onFailure = (e) => {
  }  

  render() {
    const { classes, isOpened, handleSideBarOpen } = this.props
    return (
      <React.Fragment>
        <AppBar
            position="absolute"
            className={classNames(classes.appBar, isOpened && classes.appBarShift)}
          >
          <Toolbar disableGutters={!isOpened} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open SideBar"
              onClick={handleSideBarOpen}
              className={classNames(
                classes.menuButton,
                isOpened && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
            <GoogleLogout
              onLogoutSuccess={this.onSuccess}
              onFailure={this.onFailure}
              render={this.onLogoutButton}
            />
          </Toolbar>
        </AppBar>
      </React.Fragment>
    )
  }
}

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
})


HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    auth: store.auth
  }
}

// Retrieve dispatch and callbacks from store as props
const mapDispatchToProps = dispatch => {
  return {
    logoutSucceeded: () => dispatch(logoutSucceeded()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderBar))