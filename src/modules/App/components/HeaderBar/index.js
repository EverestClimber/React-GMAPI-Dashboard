import React, { Component } from 'react'

// Import Components
import {
  ThreeBounce
} from 'better-react-spinkit'

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 240;

class HeaderBar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { classes, isOpened, handleSideBarOpen } = this.props;
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
            <IconButton color="inherit" style={{outline: 'none'}}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
});


HeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar)
